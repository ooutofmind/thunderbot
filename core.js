const botName = 'outofmind/thunderbot';

const UserActionType = {Move: 0, Shoot: 1};

const Direction = {Left: 0, Up: 1, Right: 2, Down: 3};

const CellType = {Tank: 0, Barrier: 1, NotDestroyable: 2, Water: 3, Bullet: -1};


let table = document.createElement('table');
document.body.appendChild(table);

let startProfile = Date.now();
let graph = new Graph(input);
let myTankCoord = input.ContentsInfo.filter(cell => cell.Type === CellType.Tank && cell.UserId === botName)[0].Coordinates;
let myTankNode = graph.map[myTankCoord.Y][myTankCoord.X];
let enemyTankCoord = input.ContentsInfo.filter(cell => cell.Type === CellType.Tank && cell.UserId !== botName)[0].Coordinates;
let enemyTankNode = graph.map[enemyTankCoord.Y][enemyTankCoord.X];


let endProfile = Date.now();
//alert("It takes " + (endProfile - startProfile) + 'ms');
let pathFinder = new AStarSteering(input);

for (let i = pathFinder.mapSize.height - 1; i >= 0; i--) {
    let row = pathFinder.graph[i];
    let tr = document.createElement('tr');
    tr.id = 'row' + i;
    table.appendChild(tr);


    for (let j = 0; j < pathFinder.mapSize.width; j++) {
        let td = document.createElement('td');
        td.id = 'cell' + i + '-' + j;
        let cell = pathFinder.graph[i][j];
        let className;
        switch (cell.Type) {
            case CellType.NotDestroyable:
                className = 'wall';
                break;
            case CellType.Barrier:
                className = cell.HealthCount === 2 ? 'house' : 'tree';
                break;
            case CellType.Water:
                className = 'water';
                break;
            case CellType.Tank:
                className = cell.UserId === botName ? 'myTank' : 'enemy';
                break;
            case CellType.Bullet:
                className = 'bullet';
                break;
        }

        if(graph.obstacles[cell.Coordinates.X + ";" + cell.Coordinates.Y] === true) {
            className = 'wall';
        }
        if (className) {
            td.classList.add(className);
        }
        tr.appendChild(td);
    }
}

let finder = new PathFinder(graph, myTankNode, enemyTankNode);
let path = finder.walkBetween(myTankNode, enemyTankNode);

for (let i = 0; i < path.length; i++) {
    let node = path[i];
    let point = document.getElementById("cell" + node.Y + "-" + node.X);
    point.classList.add("path");

}

function GraphNode(x, y) {
    this.X = x;
    this.Y = y;
    this.f = Infinity;
    this.g = Infinity;

    this.hash = function () {
        return this.X + ";" + this.Y
    };
}

function Graph(gameState) {
    this.mapSize = {width: 0, height: 0};
    this.map = [];

    this.obstacles = {};

    let r = gameState.ZoneRadius;

    gameState.ContentsInfo.forEach(cell => {
        let y = cell.Coordinates.Y;
        let x = cell.Coordinates.X;

        if (cell.Type === CellType.NotDestroyable || cell.Type === CellType.Water) {
            this.obstacles[x + ";" + y] = true;
        }

        let mapSize = this.mapSize;
        if (x > mapSize.width) {
            mapSize.width = x;
        }

        if (y > mapSize.height) {
            mapSize.height = y;
        }
    });

    let center = new GraphNode(Math.floor(this.mapSize.width / 2), Math.floor(this.mapSize.height / 2));
    gameState.ContentsInfo.forEach(cell => {
        let y = cell.Coordinates.Y;
        let x = cell.Coordinates.X;




    });

    for (let y = 0; y < this.mapSize.height; y++) {
        this.map[y] = [];

        for (let x = 0; x < this.mapSize.width; x++) {
            let node = this.map[y][x] = new GraphNode(x, y);
            let hash = node.hash();
            if (this.obstacles[hash] !== true && !insideArea(center, node, r)) {
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

    this.walkBetween = function (start, end) {
        this.opened.push(start);
        start.f = heuristic(start, end);
        start.g = 0;

        let result = [];

        while (this.opened.size() > 0) {
            let current = this.opened.getNext();
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

                    /*let point = document.getElementById("cell" + neighbour.Y + "-" + neighbour.X);
                    point.classList.add("visited");*/
                    this.closed[neighbour.hash()] = true;
                }
            }
        }

        function heuristic(from, to) {
            return Math.abs(from.X - to.X) + Math.abs(from.Y - to.Y)
        }

        function neighbours(coordinates, graph) {
            return [
                new GraphNode(coordinates.X + 1, coordinates.Y),
                new GraphNode(coordinates.X - 1, coordinates.Y),
                new GraphNode(coordinates.X, coordinates.Y + 1),
                new GraphNode(coordinates.X, coordinates.Y - 1),
            ].filter(node => !graph.obstacles[node.hash()]
                && node.X >= 0
                && graph.mapSize.width >= node.X
                && node.Y >= 0
                && graph.mapSize.height >= node.Y
            );
        }
    };
}


function AStarSteering(gameState) {
    this.mapSize = {width: 0, height: 0};
    this.gameState = gameState;
    this.restricted = {};
    this.closed = {};
    this.graph = [];

    gameState.ContentsInfo.forEach(cell => {
        let y = cell.Coordinates.Y;
        let x = cell.Coordinates.X;

        let mapSize = this.mapSize;
        if (x > mapSize.width) {
            mapSize.width = x;
        }

        if (y > mapSize.height) {
            mapSize.height = y;
        }

        let row = this.graph[y];
        if (!row) row = this.graph[y] = [];
        row[x] = cell;

        this.closed[x + ';' + y] = true;
        this.restricted[x + ';' + y] = true;
    });

    gameState.BulletsInfo.forEach(bullet => {
        let y = bullet.Coordinates.Y;
        let x = bullet.Coordinates.X;

        let row = this.graph[y];
        if (!row) row = this.graph[y] = [];
        bullet.Type = CellType.Bullet;
        row[x] = bullet;

        if (bullet.OwnerId !== botName) {
            let bulletSpeed = 2;
            let bulletFuturePlace = {x: x, y: y};
            switch (bullet.Direction) {
                case Direction.Up:
                    this.closed[bulletFuturePlace.x + ';' + bulletFuturePlace.y] = true;
                    bulletFuturePlace.y += bulletSpeed;
                    break;
                case Direction.Down:
                    bulletFuturePlace.y -= bulletSpeed;
                    break;
                case Direction.Left:
                    bulletFuturePlace.x -= bulletSpeed;
                    break;
                case Direction.Right:
                    bulletFuturePlace.x += bulletSpeed;
                    break;
            }
            this.closed[bulletFuturePlace.x + ';' + bulletFuturePlace.y] = true;
            this.restricted[bulletFuturePlace.x + ';' + bulletFuturePlace.y] = true;
        }
    });

    for (let y = 0; y < this.mapSize.height; y++) {
        let row = this.graph[y];
        if (!row) row = this.graph[y] = [];

        for (let x = 0; x < this.mapSize.width; x++) {
            let cell = this.graph[y][x];
            if (!cell) {
                cell = this.graph[y][x] = {Coordinates: {X: x, Y: y}};
            }
        }
    }
}
