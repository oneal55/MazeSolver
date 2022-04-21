class Vertex {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = "white";
        this.left = null;
        this.right = null;
        this.top = null;
        this.bottom = null;
        this.on = true;
    }

    seenIn = (dictionary) => {
        return dictionary[this];
    }

    addNeighbors = (worklist) => {
        worklist.push(this.left);
        worklist.push(this.right);
        worklist.push(this.bottom);
        worklist.push(this.top);

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
        this.worklist = [];
        this.visited = [];
        this.cellSize = cellSize;
        this.interval = 0;
        this.cameFromEdge = {}
    }

    search = () => {
        if (this.search !== "None") {
            this.interval = setInterval(this.searchOnce, 500);
        }
        else {
            clearInterval(this.interval);
        }
    }
    
    searchOnce = () => {
        if (this.search === "Depth-First") {
            if (this.worklist.length > 0) {
                let node = (this.worklist.shift());
                node.color = "#40e0d0"
                if (!node.seenIn(this.dictionary)) {
                    node.addNeighbors(this.worklist);
                }
            }
        }
    }

    updateSearch = (input) => {
        console.log("i was called");
        this.search = input;
    }
}

export default Maze;