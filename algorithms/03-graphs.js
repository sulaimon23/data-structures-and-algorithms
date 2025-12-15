/**
 * GRAPH ALGORITHMS - Implementation and Examples
 * Graphs are collections of nodes (vertices) connected by edges
 */

// ==================== GRAPH REPRESENTATION ====================

// Adjacency List (most common)
class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    // Add vertex - O(1)
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    // Add edge - O(1)
    addEdge(vertex1, vertex2) {
        if (!this.adjacencyList[vertex1]) this.addVertex(vertex1);
        if (!this.adjacencyList[vertex2]) this.addVertex(vertex2);
        
        this.adjacencyList[vertex1].push(vertex2);
        this.adjacencyList[vertex2].push(vertex1); // For undirected graph
    }

    // Remove edge - O(V)
    removeEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
            v => v !== vertex2
        );
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
            v => v !== vertex1
        );
    }

    // Remove vertex - O(V + E)
    removeVertex(vertex) {
        while (this.adjacencyList[vertex].length) {
            const adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex);
        }
        delete this.adjacencyList[vertex];
    }
}

// Weighted Graph
class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    addEdge(vertex1, vertex2, weight) {
        if (!this.adjacencyList[vertex1]) this.addVertex(vertex1);
        if (!this.adjacencyList[vertex2]) this.addVertex(vertex2);
        
        this.adjacencyList[vertex1].push({ node: vertex2, weight });
        this.adjacencyList[vertex2].push({ node: vertex1, weight });
    }
}

// ==================== DEPTH-FIRST SEARCH (DFS) ====================
// Time: O(V + E), Space: O(V)

// Recursive DFS
function dfsRecursive(graph, start) {
    const result = [];
    const visited = {};
    
    function dfs(vertex) {
        if (!vertex) return null;
        visited[vertex] = true;
        result.push(vertex);
        
        graph.adjacencyList[vertex].forEach(neighbor => {
            if (!visited[neighbor]) {
                dfs(neighbor);
            }
        });
    }
    
    dfs(start);
    return result;
}

// Iterative DFS
function dfsIterative(graph, start) {
    const stack = [start];
    const result = [];
    const visited = {};
    visited[start] = true;
    
    while (stack.length) {
        const vertex = stack.pop();
        result.push(vertex);
        
        graph.adjacencyList[vertex].forEach(neighbor => {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                stack.push(neighbor);
            }
        });
    }
    
    return result;
}

// ==================== BREADTH-FIRST SEARCH (BFS) ====================
// Time: O(V + E), Space: O(V)
function bfs(graph, start) {
    const queue = [start];
    const result = [];
    const visited = {};
    visited[start] = true;
    
    while (queue.length) {
        const vertex = queue.shift();
        result.push(vertex);
        
        graph.adjacencyList[vertex].forEach(neighbor => {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push(neighbor);
            }
        });
    }
    
    return result;
}

// ==================== SHORTEST PATH ALGORITHMS ====================

// Shortest Path (BFS for unweighted graphs)
function shortestPath(graph, start, end) {
    const queue = [[start]];
    const visited = new Set([start]);
    
    while (queue.length) {
        const path = queue.shift();
        const vertex = path[path.length - 1];
        
        if (vertex === end) {
            return path;
        }
        
        for (const neighbor of graph.adjacencyList[vertex]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([...path, neighbor]);
            }
        }
    }
    
    return null;
}

// Dijkstra's Algorithm (weighted graphs, non-negative weights)
// Time: O((V + E) log V) with binary heap, O(V²) with array
function dijkstra(graph, start, end) {
    const distances = {};
    const previous = {};
    const nodes = new PriorityQueue();
    const path = [];
    
    // Initialize distances
    for (const vertex in graph.adjacencyList) {
        if (vertex === start) {
            distances[vertex] = 0;
            nodes.enqueue(vertex, 0);
        } else {
            distances[vertex] = Infinity;
            nodes.enqueue(vertex, Infinity);
        }
        previous[vertex] = null;
    }
    
    while (nodes.values.length) {
        const smallest = nodes.dequeue().val;
        
        if (smallest === end) {
            // Build path
            let current = end;
            while (current) {
                path.push(current);
                current = previous[current];
            }
            return path.reverse();
        }
        
        if (smallest || distances[smallest] !== Infinity) {
            for (const neighbor of graph.adjacencyList[smallest]) {
                const candidate = distances[smallest] + neighbor.weight;
                const nextNeighbor = neighbor.node;
                
                if (candidate < distances[nextNeighbor]) {
                    distances[nextNeighbor] = candidate;
                    previous[nextNeighbor] = smallest;
                    nodes.enqueue(nextNeighbor, candidate);
                }
            }
        }
    }
    
    return [];
}

// Simple Priority Queue for Dijkstra
class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }
}

// ==================== CYCLE DETECTION ====================

// Detect cycle in undirected graph - O(V + E)
function hasCycleUndirected(graph) {
    const visited = new Set();
    
    function dfs(vertex, parent) {
        visited.add(vertex);
        
        for (const neighbor of graph.adjacencyList[vertex]) {
            if (!visited.has(neighbor)) {
                if (dfs(neighbor, vertex)) return true;
            } else if (neighbor !== parent) {
                return true;
            }
        }
        return false;
    }
    
    for (const vertex in graph.adjacencyList) {
        if (!visited.has(vertex)) {
            if (dfs(vertex, null)) return true;
        }
    }
    return false;
}

// Detect cycle in directed graph - O(V + E)
function hasCycleDirected(graph) {
    const WHITE = 0, GRAY = 1, BLACK = 2;
    const color = {};
    
    // Initialize all vertices as white
    for (const vertex in graph.adjacencyList) {
        color[vertex] = WHITE;
    }
    
    function dfs(vertex) {
        color[vertex] = GRAY; // Mark as being processed
        
        for (const neighbor of graph.adjacencyList[vertex]) {
            if (color[neighbor] === GRAY) return true; // Back edge found
            if (color[neighbor] === WHITE && dfs(neighbor)) return true;
        }
        
        color[vertex] = BLACK; // Mark as processed
        return false;
    }
    
    for (const vertex in graph.adjacencyList) {
        if (color[vertex] === WHITE) {
            if (dfs(vertex)) return true;
        }
    }
    return false;
}

// ==================== TOPOLOGICAL SORT ====================
// Time: O(V + E), Space: O(V)
// Only for Directed Acyclic Graphs (DAG)
function topologicalSort(graph) {
    const visited = new Set();
    const stack = [];
    
    function dfs(vertex) {
        visited.add(vertex);
        
        for (const neighbor of graph.adjacencyList[vertex]) {
            if (!visited.has(neighbor)) {
                dfs(neighbor);
            }
        }
        stack.push(vertex);
    }
    
    for (const vertex in graph.adjacencyList) {
        if (!visited.has(vertex)) {
            dfs(vertex);
        }
    }
    
    return stack.reverse();
}

// ==================== CONNECTED COMPONENTS ====================

// Count connected components - O(V + E)
function countConnectedComponents(graph) {
    const visited = new Set();
    let count = 0;
    
    function dfs(vertex) {
        visited.add(vertex);
        for (const neighbor of graph.adjacencyList[vertex]) {
            if (!visited.has(neighbor)) {
                dfs(neighbor);
            }
        }
    }
    
    for (const vertex in graph.adjacencyList) {
        if (!visited.has(vertex)) {
            dfs(vertex);
            count++;
        }
    }
    
    return count;
}

// ==================== TESTING ====================

console.log("=== Graph Creation ===");
const g = new Graph();
g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");

g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "E");
g.addEdge("D", "E");
g.addEdge("D", "F");
g.addEdge("E", "F");

console.log("Graph:", g.adjacencyList);

console.log("\n=== DFS (Recursive) ===");
console.log(dfsRecursive(g, "A")); // ['A', 'B', 'D', 'E', 'C', 'F']

console.log("\n=== DFS (Iterative) ===");
console.log(dfsIterative(g, "A")); // ['A', 'C', 'E', 'F', 'D', 'B']

console.log("\n=== BFS ===");
console.log(bfs(g, "A")); // ['A', 'B', 'C', 'D', 'E', 'F']

console.log("\n=== Shortest Path ===");
console.log(shortestPath(g, "A", "F")); // ['A', 'B', 'D', 'F']

console.log("\n=== Connected Components ===");
const g2 = new Graph();
g2.addVertex("1");
g2.addVertex("2");
g2.addVertex("3");
g2.addVertex("4");
g2.addEdge("1", "2");
g2.addEdge("3", "4");
console.log("Components:", countConnectedComponents(g2)); // 2

