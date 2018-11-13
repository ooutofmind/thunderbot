const botName = 'outofmind/thunderbot';

const UserActionType = {Move: 0, Shoot: 1};

const Direction = {Left: 0, Up: 1, Right: 2, Down: 3};

const CellType = {Tank: 0, Barrier: 1, NotDestroyable: 2, Water: 3, Bullet: -1};


let table = document.createElement('table');
document.body.appendChild(table);

let graph = new Graph(input);

let pathFinder = new AStarSteering(input);

for (let i = pathFinder.mapSize.height - 1; i >= 0; i--) {
    let row = pathFinder.graph[i];
    let tr = document.createElement('tr');
    tr.id = 'row' + i;
    table.appendChild(tr);


    for (let j = 0; j < pathFinder.mapSize.width; j++) {
        let td = document.createElement('td');
        td.id = 'cell' + j;
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
        td.classList.add(className);
        tr.appendChild(td);
    }
}

debugger;

function Node(x, y) {
    this.X = x;
    this.Y = y;
    this.neighbours = [];
    this.f = Infinity;
    this.g = Infinity;

    this.hash = function () {
        return this.X + ";" + this.Y
    }
}

function Graph(gameState) {
    this.mapSize = {width: 0, height: 0};
    this.map = [];

    let obstacles = {};

    gameState.ContentsInfo.forEach(cell => {
        let y = cell.Coordinates.Y;
        let x = cell.Coordinates.X;

        if (cell.Type === CellType.NotDestroyable || cell.Type === CellType.Water) {
            obstacles[x + ";" + y] = true;
        }

        let mapSize = this.mapSize;
        if (x > mapSize.width) {
            mapSize.width = x;
        }

        if (y > mapSize.height) {
            mapSize.height = y;
        }
    });

    for (let y = 0; y < this.mapSize.height; y++) {
        this.map[y] = [];

        for (let x = 0; x < this.mapSize.width; x++) {
            let coordinates = {X: x, Y: y};
            let node = new Node(x, y);
            node.neighbours = neighbours(coordinates, this.mapSize);
            this.map[y][x] = node;
        }
    }

    function neighbours(coordinates, mapSize) {
        return [
            new Node(coordinates.X + 1, coordinates.Y),
            new Node(coordinates.X - 1, coordinates.Y),
            new Node(coordinates.X, coordinates.Y + 1),
            new Node(coordinates.X, coordinates.Y - 1),
        ].filter(node => !obstacles[node.X + ";" + node.Y]
            && node.X >= 0
            && mapSize.width >= node.X
            && node.Y >= 0
            && mapSize.height >= node.Y
        );
    }
}

function PathFinder(graph, sourceNode, targetNode) {
    let opened = [];
    opened.push(sourceNode);
    let closed = {};
    let cameFrom = {};
    let gScore = {};
    let fScore = {};

    gScore[sourceNode.hash()] = 0;
    fScore[sourceNode.hash()] = h(sourceNode, targetNode);

    sourceNode.f = h(sourceNode, targetNode);
    sourceNode.g = 0;

    while (opened.length > 0) {
        let current = opened.get(0);
        let minH = 9999;
        let next = null;
        for (let i = 0; i < current.neighbours.length; i++) {
            let neighbour = current.neighbours[i];
            let currH = h(neighbour, targetNode);
            if (minH > currH) {
                minH = currH;
                next = neighbour
            }


        }

    }

    function getNext(fScore) {
        let min, res;
        for(let hash in fScore) {
            if(fScore[hash] < min) {
                min = fScore[hash];
                res = hash;
            }
        }
    }

    function h(from, to) {
        return Math.abs(from.X - to.X) + Math.abs(from.Y - to.Y)
    }

    function getPath(cameFrom, current) {

    }
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
