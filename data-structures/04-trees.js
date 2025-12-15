/**
 * TREES - Implementation and Examples
 * Hierarchical structure with nodes and edges
 */

// ==================== BINARY TREE NODE ====================

class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// ==================== BINARY SEARCH TREE ====================

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    // Insert - O(log n) average, O(n) worst
    insert(value) {
        const newNode = new TreeNode(value);
        
        if (!this.root) {
            this.root = newNode;
            return this;
        }
        
        let current = this.root;
        while (true) {
            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else if (value > current.value) {
                if (!current.right) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            } else {
                // Value already exists
                return this;
            }
        }
    }

    // Search - O(log n) average, O(n) worst
    lookup(value) {
        if (!this.root) return false;
        
        let current = this.root;
        while (current) {
            if (value < current.value) {
                current = current.left;
            } else if (value > current.value) {
                current = current.right;
            } else {
                return true;
            }
        }
        return false;
    }

    // Delete - O(log n) average, O(n) worst
    remove(value) {
        if (!this.root) return false;
        
        let current = this.root;
        let parent = null;
        
        // Find node to delete
        while (current && current.value !== value) {
            parent = current;
            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        
        if (!current) return false;
        
        // Case 1: No children
        if (!current.left && !current.right) {
            if (!parent) {
                this.root = null;
            } else if (parent.left === current) {
                parent.left = null;
            } else {
                parent.right = null;
            }
        }
        // Case 2: One child
        else if (!current.left || !current.right) {
            const child = current.left || current.right;
            if (!parent) {
                this.root = child;
            } else if (parent.left === current) {
                parent.left = child;
            } else {
                parent.right = child;
            }
        }
        // Case 3: Two children
        else {
            // Find inorder successor (smallest in right subtree)
            let successor = current.right;
            let successorParent = current;
            
            while (successor.left) {
                successorParent = successor;
                successor = successor.left;
            }
            
            // Replace value
            current.value = successor.value;
            
            // Remove successor
            if (successorParent.left === successor) {
                successorParent.left = successor.right;
            } else {
                successorParent.right = successor.right;
            }
        }
        
        return true;
    }
}

// ==================== TREE TRAVERSALS ====================

// 1. Inorder: Left → Root → Right - O(n) time, O(h) space
function inorderTraversal(root) {
    const result = [];
    
    function traverse(node) {
        if (!node) return;
        traverse(node.left);
        result.push(node.value);
        traverse(node.right);
    }
    
    traverse(root);
    return result;
}

// Iterative version
function inorderTraversalIterative(root) {
    const result = [];
    const stack = [];
    let current = root;
    
    while (current || stack.length > 0) {
        while (current) {
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        result.push(current.value);
        current = current.right;
    }
    
    return result;
}

// 2. Preorder: Root → Left → Right - O(n) time, O(h) space
function preorderTraversal(root) {
    const result = [];
    
    function traverse(node) {
        if (!node) return;
        result.push(node.value);
        traverse(node.left);
        traverse(node.right);
    }
    
    traverse(root);
    return result;
}

// 3. Postorder: Left → Right → Root - O(n) time, O(h) space
function postorderTraversal(root) {
    const result = [];
    
    function traverse(node) {
        if (!node) return;
        traverse(node.left);
        traverse(node.right);
        result.push(node.value);
    }
    
    traverse(root);
    return result;
}

// 4. Level-order (BFS): Level by level - O(n) time, O(n) space
function levelOrderTraversal(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const level = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            level.push(node.value);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(level);
    }
    
    return result;
}

// ==================== COMMON TREE PROBLEMS ====================

// 1. Maximum Depth - O(n) time, O(h) space
function maxDepth(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// 2. Same Tree - O(n) time, O(h) space
function isSameTree(p, q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    if (p.value !== q.value) return false;
    
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

// 3. Symmetric Tree - O(n) time, O(h) space
function isSymmetric(root) {
    if (!root) return true;
    
    function isMirror(left, right) {
        if (!left && !right) return true;
        if (!left || !right) return false;
        if (left.value !== right.value) return false;
        
        return isMirror(left.left, right.right) && isMirror(left.right, right.left);
    }
    
    return isMirror(root.left, root.right);
}

// 4. Validate BST - O(n) time, O(h) space
function isValidBST(root) {
    function validate(node, min, max) {
        if (!node) return true;
        if (node.value <= min || node.value >= max) return false;
        
        return validate(node.left, min, node.value) && 
               validate(node.right, node.value, max);
    }
    
    return validate(root, -Infinity, Infinity);
}

// 5. Lowest Common Ancestor - O(n) time, O(h) space
function lowestCommonAncestor(root, p, q) {
    if (!root || root === p || root === q) return root;
    
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    
    if (left && right) return root;
    return left || right;
}

// 6. Path Sum - O(n) time, O(h) space
function hasPathSum(root, targetSum) {
    if (!root) return false;
    if (!root.left && !root.right) return root.value === targetSum;
    
    return hasPathSum(root.left, targetSum - root.value) || 
           hasPathSum(root.right, targetSum - root.value);
}

// 7. Count Nodes - O(n) time, O(h) space
function countNodes(root) {
    if (!root) return 0;
    return 1 + countNodes(root.left) + countNodes(root.right);
}

// 8. Invert Binary Tree - O(n) time, O(h) space
function invertTree(root) {
    if (!root) return null;
    
    [root.left, root.right] = [root.right, root.left];
    invertTree(root.left);
    invertTree(root.right);
    
    return root;
}

// ==================== HEAP (Priority Queue) ====================

class MinHeap {
    constructor() {
        this.heap = [];
    }

    // Get parent index
    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    // Get left child index
    getLeftChildIndex(index) {
        return 2 * index + 1;
    }

    // Get right child index
    getRightChildIndex(index) {
        return 2 * index + 2;
    }

    // Swap two elements
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    // Insert - O(log n)
    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    // Heapify up - O(log n)
    heapifyUp() {
        let index = this.heap.length - 1;
        
        while (index > 0) {
            const parentIndex = this.getParentIndex(index);
            if (this.heap[parentIndex] <= this.heap[index]) break;
            
            this.swap(parentIndex, index);
            index = parentIndex;
        }
    }

    // Extract min - O(log n)
    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return min;
    }

    // Heapify down - O(log n)
    heapifyDown() {
        let index = 0;
        
        while (this.getLeftChildIndex(index) < this.heap.length) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            
            if (this.getRightChildIndex(index) < this.heap.length &&
                this.heap[this.getRightChildIndex(index)] < this.heap[smallerChildIndex]) {
                smallerChildIndex = this.getRightChildIndex(index);
            }
            
            if (this.heap[index] <= this.heap[smallerChildIndex]) break;
            
            this.swap(index, smallerChildIndex);
            index = smallerChildIndex;
        }
    }

    // Peek - O(1)
    peek() {
        return this.heap[0] || null;
    }

    size() {
        return this.heap.length;
    }
}

// ==================== TESTING ====================

console.log("=== Binary Search Tree ===");
const bst = new BinarySearchTree();
bst.insert(9);
bst.insert(4);
bst.insert(6);
bst.insert(20);
bst.insert(170);
bst.insert(15);
bst.insert(1);
console.log(bst.lookup(20)); // true
console.log(bst.lookup(100)); // false

console.log("\n=== Tree Traversals ===");
const tree = new TreeNode(1);
tree.left = new TreeNode(2);
tree.right = new TreeNode(3);
tree.left.left = new TreeNode(4);
tree.left.right = new TreeNode(5);

console.log("Inorder:", inorderTraversal(tree)); // [4, 2, 5, 1, 3]
console.log("Preorder:", preorderTraversal(tree)); // [1, 2, 4, 5, 3]
console.log("Postorder:", postorderTraversal(tree)); // [4, 5, 2, 3, 1]
console.log("Level-order:", levelOrderTraversal(tree)); // [[1], [2, 3], [4, 5]]

console.log("\n=== Max Depth ===");
console.log(maxDepth(tree)); // 3

console.log("\n=== Min Heap ===");
const heap = new MinHeap();
heap.insert(10);
heap.insert(5);
heap.insert(20);
heap.insert(3);
console.log(heap.extractMin()); // 3
console.log(heap.peek()); // 5

