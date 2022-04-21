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

    seenIn = (dictionary, visited) => {
        return visited.includes(this);
    }

    addNeighbors = (worklist, cameFromEdge, visited) => {
        if (this.left != null && this.left.on && !this.left.seenIn(cameFromEdge, visited)) {
            worklist.push(this.left);
            cameFromEdge[this.left] = this;
        }
        if (this.right != null && this.right.on && !this.right.seenIn(cameFromEdge, visited)) {
            worklist.push(this.right);
            cameFromEdge[this.right] = this;
        }
        if (this.bottom != null && this.bottom.on && !this.bottom.seenIn(cameFromEdge, visited)) {
            worklist.push(this.bottom);
            cameFromEdge[this.bottom] = this;
        }
        if (this.top != null && this.top.on && !this.top.seenIn(cameFromEdge, visited)) {
            worklist.push(this.top);
            cameFromEdge[this.top] = this;
        }

    }
}

class Graph {
    constructor(vertices) {
        this.vertices = vertices;
    }
}

class Maze {
    constructor(width, height, cellSize, search) {
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
        this.search = search;
        this.worklist = [];
        this.visited = [];
        this.cellSize = cellSize;
        this.interval = 0;
        this.cameFromEdge = {}
    }

    searchMaze = () => {
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
                let node = (this.worklist.pop());
                node.color = "#40e0d0"
                    node.addNeighbors(this.worklist, this.cameFromEdge, this.visited);
                    this.visited.push(node);
            }
        }

        if (this.search === "Breadth-First") {
            if (this.worklist.length > 0) {
                let node = (this.worklist.shift());
                node.color = "#40e0d0"
                    node.addNeighbors(this.worklist, this.cameFromEdge, this.visited);
                    this.visited.push(node);
            }
        }
    }

    updateSearch = (input) => {
        console.log("i was called");
        this.search = input;
    }

    startSearch = () => {
        this.worklist.push(this.startPoint);
        this.search = "Depth-First";
        for (let i = 0; i < 35; i++) {
            this.searchOnce();

        }
    }
}

export default Maze;