class Vertex {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = "white";
        this.left = null;
        this.right = null;
        this.top = null;
        this.right = null;
        this.on = true;
    }
}

class Graph {
    constructor(vertices) {
        this.vertices = vertices;
    }
}

class Maze {
    constructor(width, height, cellSize) {
        let grid = [];
        for (let i = 0; i < height; i++) {
            let row = [];
            for (let j = 0; j < width; j++) {
                row.push(new Vertex(j, i));
            }
            grid.push(row);
        }

        for (let i = 0; i < height; i ++) {
            for (let j = 0; j < width; j++) {
                if (i > 0) {
                    grid[i][j].top = grid[i - 1][j];
                }

                if (i < height - 1) {
                    grid[i][j].bottom = grid[i + 1][j];
                }
                
                if (j > 0) {
                    grid[i][j].left = grid[i][j - 1];
                }

                if (j < width - 1) {
                    grid[i][j].right = grid[i][j + 1];
                }
            }
        }

        this.width = width;
        this.height = height;
        this.graph = new Graph(grid);
        this.startPoint = null;
        this.goalPoint = null;
        this.search = "None";
        this.worklist = [];
        this.visited = [];
        this.cellSize = cellSize;
    }
}

export default Maze;