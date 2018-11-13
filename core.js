const botName = 'outofmind/thunderbot';
let input = {
    "ContentsInfo": [{"Coordinates": {"X": 0, "Y": 0}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {
            "X": 1,
            "Y": 0
        }, "HealthCount": 255, "Type": 2
    }, {"Coordinates": {"X": 2, "Y": 0}, "HealthCount": 1, "Type": 1}, {
        "Coordinates": {"X": 11, "Y": 2},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 16, "Y": 2}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 21, "Y": 2},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 0, "Y": 3}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 7, "Y": 3},
        "HealthCount": 2,
        "Type": 1
    }, {"Coordinates": {"X": 11, "Y": 3}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 20, "Y": 3},
        "HealthCount": 3,
        "Type": 0,
        "UserId": "outofmind/thunderbot"
    }, {"Coordinates": {"X": 21, "Y": 3}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 0, "Y": 4},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 1, "Y": 4}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 5, "Y": 4},
        "HealthCount": 1,
        "Type": 1
    }, {"Coordinates": {"X": 10, "Y": 4}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 11, "Y": 4},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 14, "Y": 4}, "HealthCount": 1, "Type": 1}, {
        "Coordinates": {"X": 21, "Y": 4},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 0, "Y": 5}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 1, "Y": 5},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 2, "Y": 5}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 11, "Y": 5},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 20, "Y": 5}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 21, "Y": 5},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 0, "Y": 6}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 1, "Y": 6},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 2, "Y": 6}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 7, "Y": 6},
        "HealthCount": 255,
        "Type": 3
    }, {"Coordinates": {"X": 8, "Y": 6}, "HealthCount": 255, "Type": 3}, {
        "Coordinates": {"X": 9, "Y": 6},
        "HealthCount": 255,
        "Type": 3
    }, {"Coordinates": {"X": 19, "Y": 6}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 20, "Y": 6},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 21, "Y": 6}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 0, "Y": 7},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 1, "Y": 7}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 8, "Y": 7},
        "HealthCount": 255,
        "Type": 3
    }, {"Coordinates": {"X": 9, "Y": 7}, "HealthCount": 255, "Type": 3}, {
        "Coordinates": {"X": 16, "Y": 7},
        "HealthCount": 1,
        "Type": 1
    }, {"Coordinates": {"X": 19, "Y": 7}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 20, "Y": 7},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 21, "Y": 7}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 0, "Y": 8},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 3, "Y": 8}, "HealthCount": 1, "Type": 1}, {
        "Coordinates": {"X": 9, "Y": 8},
        "HealthCount": 255,
        "Type": 3
    }, {"Coordinates": {"X": 17, "Y": 8}, "HealthCount": 2, "Type": 1}, {
        "Coordinates": {"X": 20, "Y": 8},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 21, "Y": 8}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 0, "Y": 9},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 13, "Y": 9}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 14, "Y": 9},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 21, "Y": 9}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 0, "Y": 10},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 5, "Y": 10}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 7, "Y": 10},
        "HealthCount": 2,
        "Type": 1
    }, {"Coordinates": {"X": 13, "Y": 10}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 14, "Y": 10},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 15, "Y": 10}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 21, "Y": 10},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 0, "Y": 11}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 5, "Y": 11},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 6, "Y": 11}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 15, "Y": 11},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 16, "Y": 11}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 18, "Y": 11},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 21, "Y": 11}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 0, "Y": 12},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 1, "Y": 12}, "HealthCount": 3, "Type": 0, "UserId": "r2"}, {
        "Coordinates": {
            "X": 4,
            "Y": 12
        }, "HealthCount": 255, "Type": 2
    }, {"Coordinates": {"X": 5, "Y": 12}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 6, "Y": 12},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 7, "Y": 12}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 16, "Y": 12},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 17, "Y": 12}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 18, "Y": 12},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 19, "Y": 12}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 20, "Y": 12},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 21, "Y": 12}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 0, "Y": 13},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 1, "Y": 13}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 2, "Y": 13},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 3, "Y": 13}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 4, "Y": 13},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 5, "Y": 13}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 6, "Y": 13},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 7, "Y": 13}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 8, "Y": 13},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 9, "Y": 13}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 10, "Y": 13},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 11, "Y": 13}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 12, "Y": 13},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 13, "Y": 13}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 14, "Y": 13},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 15, "Y": 13}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 16, "Y": 13},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 17, "Y": 13}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 18, "Y": 13},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 19, "Y": 13}, "HealthCount": 255, "Type": 2}, {
        "Coordinates": {"X": 20, "Y": 13},
        "HealthCount": 255,
        "Type": 2
    }, {"Coordinates": {"X": 21, "Y": 13}, "HealthCount": 255, "Type": 2}],
    "BulletsInfo": [{"Coordinates": {"X": 17, "Y": 3}, "Direction": 2, "OwnerId": "r1"}],
    "ZoneRadius": 94
};


const UserActionType = {Move: 0, Shoot: 1};

const Direction = {Left: 0, Up: 1, Right: 2, Down: 3};

const CellType = {Tank: 0, Barrier: 1, NotDestroyable: 2, Water: 3, Bullet: -1};


let table = document.createElement('table');
document.body.appendChild(table);

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


function AStarSteering(gameState) {
    this.mapSize = {width: 0, height: 0};
    this.gameState = gameState;
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

    function getDirs(cell) {
        let y = cell.Coordinates.Y;
        let x = cell.Coordinates.X;
    }


}
