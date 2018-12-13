const linq = require('linq'),
    readline = require('readline'),
    log = console.log,
    rl = readline.createInterface(process.stdin, process.stdout),
    botName = 'outofmind/thunderbot';

const UserActionType = {Move: 0, Shoot: 1};

const Direction = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3
};

const CellType = {
    Tank: 0,
    Barrier: 1,
    NotDestroyable: 2,
    Water: 3,
    Spawn: 4
};

function GraphNode(x, y) {
    this.X = x;
    this.Y = y;
    this.f = Infinity;
    this.g = Infinity;

    this.hash = function () {
        return this.X + ";" + this.Y
    };

    this.toString = function () {
        return this.hash();
    }
}

function Graph(gameState) {
    this.mapSize = {width: 0, height: 0};
    this.map = [];
    this.obstacles = {};
    this.shootable = {};
    this.bullets = {};

    let zoneRadius = gameState.ZoneRadius;

    gameState.ContentsInfo.forEach(cell => {
        let y = cell.Coordinates.Y;
        let x = cell.Coordinates.X;

        this.obstacles[x + ";" + y] = true;
        this.shootable[x + ";" + y] = cell.CellType === CellType.Water;

        let mapSize = this.mapSize;
        if (x > mapSize.width) {
            mapSize.width = x;
        }

        if (y > mapSize.height) {
            mapSize.height = y;
        }
    });

    this.center = new GraphNode(Math.floor(this.mapSize.width / 2), Math.floor(this.mapSize.height / 2));

    this.bullets = gameState.BulletsInfo
        .filter(bullet => bullet.OwnerId !== botName);

    for (let y = 0; y < this.mapSize.height; y++) {
        this.map[y] = [];

        for (let x = 0; x < this.mapSize.width; x++) {
            let node = this.map[y][x] = new GraphNode(x, y);

            let hash = node.hash();
            if (this.obstacles[hash] !== true && !insideArea(this.center, node, zoneRadius)) {
                this.obstacles[hash] = true;
            }
        }
    }

    function insideArea(center, point, radius) {
        return point.X > center.X - radius && point.X < center.X + radius
            && point.Y > center.Y - radius && point.Y < center.Y + radius

    }
}

function Queue() {
    this.content = [];

    this.getNext = function () {
        let max = Number.MAX_VALUE;
        let min = -1;

        for (let i = 0; i < this.content.length; i++) {
            if (this.content[i].f < max) {
                max = this.content[i].f;
                min = i;
            }
        }

        return this.content.splice(min, 1)[0];
    };

    this.size = function () {
        return this.content.length;
    };

    this.push = function (e) {
        return this.content.push(e);
    };

    this.clear = function () {
        this.content = [];
    }
}

function PathFinder(graph) {
    this.graph = graph;
    this.opened = new Queue();
    this.closed = {};

    this.pathBetween = function (start, end) {
        this.opened.push(start);
        start.f = heuristic(start, end);
        start.g = 0;
        let pathLength = 0;

        let result = [];

        while (this.opened.size() > 0) {
            let current = this.opened.getNext();
            pathLength++;
            this.closed[current.hash()] = true;

            if (current.hash() === end.hash()) {
                do {
                    result.push(current);
                    current = current.parent;
                } while (current);

                this.closed = {};
                this.opened.clear();

                return result.reverse();
            }

            let neighboursList = neighbours(current, this.graph);
            for (let i = 0; i < neighboursList.length; i++) {
                let neighbour = neighboursList[i];

                if (this.closed[neighbour.hash()] !== true) {

                    neighbour.parent = current;
                    neighbour.g = current.g + heuristic(neighbour, current);
                    neighbour.f = current.g + heuristic(neighbour, end);
                    this.opened.push(neighbour);

                    this.closed[neighbour.hash()] = true;
                }
            }
        }

        function heuristic(from, to) {
            return Math.abs(from.X - to.X) + Math.abs(from.Y - to.Y)
        }

        function neighbours(currentNode, graph) {
            var bulletsPositions = {};
            for (let i = 0; i < graph.bullets.length; i++) {
                fillOutputWithFutureBulletPosition(graph.bullets[i], currentNode.g, bulletsPositions);
            }

            return [
                new GraphNode(currentNode.X + 1, currentNode.Y),
                new GraphNode(currentNode.X - 1, currentNode.Y),
                new GraphNode(currentNode.X, currentNode.Y + 1),
                new GraphNode(currentNode.X, currentNode.Y - 1),
            ].filter(node => (node.hash() === end.hash() || !graph.obstacles[node.hash()])
                && node.X >= 0
                && graph.mapSize.width >= node.X
                && node.Y >= 0
                && graph.mapSize.height >= node.Y
                && !bulletsPositions[node.hash()]
            );
        }

        function fillOutputWithFutureBulletPosition(bullet, ticks, output) {
            let y = bullet.Coordinates.Y;
            let x = bullet.Coordinates.X;

            let k = 0, m = 0;
            switch (bullet.Direction) {
                case Direction.Up:
                    m = 1;
                    break;
                case Direction.Down:
                    m = -1;
                    break;
                case Direction.Left:
                    k = -1;
                    break;
                case Direction.Right:
                    k = 1;
                    break;
            }

            output[(x + ticks * 2 * k) + ";" + (y + ticks * 2 * m)] = true;
            output[((x - k) + ticks * 2 * k) + ";" + ((y - m) + ticks * 2 * m)] = true;
        }
    };
}

let frame = 0;
rl.on('line', (state) => {
    let gameState = JSON.parse(state);
    let graph = new Graph(gameState);
    let myTankCoord = gameState.ContentsInfo.filter(cell => cell.Type === CellType.Tank && cell.UserId === botName)[0].Coordinates;
    let myTankNode = graph.map[myTankCoord.Y][myTankCoord.X];

    let enemyTanks = gameState.ContentsInfo
        .filter(cell => cell.Type === CellType.Tank && cell.UserId !== botName);

    let finder = new PathFinder(graph);
    let hasMyBulletLive = gameState.BulletsInfo.filter(bullet => bullet.OwnerId === botName).length > 0;
    let response = hasMyBulletLive ? null : shootImmediately(enemyTanks, myTankCoord, graph, finder);
    if (response) {
        log(response);
        return;
    }
    let pathLength = Number.MAX_VALUE;
    let path = null;
    let shootPos = shootPositions(myTankCoord, enemyTanks, graph);
    shootPos.forEach(pos => {
        let targetNode = graph.map[pos.Y][pos.X];
        let possiblePath = finder.pathBetween(myTankNode, targetNode);
        if (possiblePath && pathLength > possiblePath.length) {
            pathLength = possiblePath.length;
            path = possiblePath;
        }
    });


    if (!path) {
        let enemy = enemyTanks[0];
        let possiblePositions = [
            new GraphNode(enemy.Coordinates.X + 3, enemy.Coordinates.Y),
            new GraphNode(enemy.Coordinates.X - 3, enemy.Coordinates.Y),
            new GraphNode(enemy.Coordinates.X, enemy.Coordinates.Y + 3),
            new GraphNode(enemy.Coordinates.X, enemy.Coordinates.Y - 3)
        ].filter(node => graph.obstacles[node.hash()] !== true
            && node.X > 0
            && node.Y > 0
            && node.X <= graph.mapSize.width
            && node.Y <= graph.mapSize.height);

        possiblePositions.forEach(targetNode => {
            let possiblePath = finder.pathBetween(myTankNode, targetNode);
            if (possiblePath && pathLength > possiblePath.length) {
                pathLength = possiblePath.length;
                path = possiblePath;
            }
        });
    }

    if(!path) {
        path = finder.pathBetween(myTankNode, graph.center);
    }

    let dX = myTankCoord.X - path[1].X;
    let dY = myTankCoord.Y - path[1].Y;

    let direction = (Math.abs(dX) > Math.abs(dY)
        ? (dX < 0 ? Direction.Right : Direction.Left)
        : (dY < 0 ? Direction.Up : Direction.Down));

    response = [{Type: UserActionType.Move, Direction: direction}];

    log(response);

    function onTheLineWithoutObstacles(p1, p2, graph) {
        let onTheLine = p1.X === p2.X || p1.Y === p2.Y;

        if (!onTheLine) return false;

        if (p1.X === p2.X) {
            let yStart = p1.Y < p2.Y ? p1.Y : p2.Y;
            for (let i = 1; i <= Math.abs(p1.Y - p2.Y) - 1; i++) {
                if (graph.obstacles[p1.X + ";" + (yStart + i)] === true &&
                    !graph.shootable[p1.X + ";" + (yStart + i)]) {
                    return false;
                }
            }
        } else if (p1.Y === p2.Y) {
            let xStart = p1.X < p2.X ? p1.X : p2.X;
            for (let i = 1; i <= Math.abs(p1.X - p2.X) - 1; i++) {
                if (graph.obstacles[(xStart + i) + ";" + p1.Y] === true &&
                    !graph.shootable[(xStart + i) + ";" + p1.Y]) {
                    return false;
                }
            }
        }

        return true;
    }

    function shootPositions(startPt, targets, graph) {
        let res = [];
        let distance = 4;
        targets.forEach(target => {
            let x = target.Coordinates.X;
            let y = target.Coordinates.Y;

            res.push({
                target: target,
                X: x,
                Y: y - startPt.Y > 0 ? y - distance : y + distance,
                onTheLine: startPt.Y === y
            });
            res.push({
                target: target,
                X: x - startPt.X > 0 ? x - distance : x + distance,
                Y: y,
                onTheLine: startPt.X === x
            });
        });

        return res.filter(pos => graph.obstacles[pos.X + ";" + pos.Y] !== true
            && onTheLineWithoutObstacles(pos, startPt, graph));
    }

    function shootImmediately(enemyTanks, myTankCoord, graph, finder) {
        let direction = null;

        let target = null;
        let minDist = Number.MAX_VALUE;

        enemyTanks
            .forEach(enemy => {
                if (onTheLineWithoutObstacles(myTankCoord, enemy.Coordinates, graph)) {
                    let dist = Math.abs(myTankCoord.X - enemy.Coordinates.X)
                        + Math.abs(myTankCoord.Y - enemy.Coordinates.Y);

                    if (dist < minDist) {
                        minDist = dist;
                        target = enemy;
                    }
                }
            });

        if (target === null) {
            return null;
        }

        if (myTankCoord.X === target.Coordinates.X) {
            direction = target.Coordinates.Y - myTankCoord.Y > 0 ? Direction.Up : Direction.Down;
        } else if (myTankCoord.Y === target.Coordinates.Y) {
            direction = target.Coordinates.X - myTankCoord.X > 0 ? Direction.Right : Direction.Left;
        }

        if (direction === null) {
            return null;
        }

        return [{Type: UserActionType.Shoot, Direction: direction}];


    }
});
