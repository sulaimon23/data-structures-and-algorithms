/**
 * STACKS AND QUEUES - Implementation and Examples
 * 
 * Stack: LIFO (Last In, First Out) - like a stack of plates
 * Queue: FIFO (First In, First Out) - like a line at a store
 */

// ==================== STACK ====================

class Stack {
    constructor() {
        this.items = [];
        this.length = 0;
    }

    // Push element - O(1)
    push(value) {
        this.items.push(value);
        this.length++;
        return this;
    }

    // Pop element - O(1)
    pop() {
        if (this.isEmpty()) return null;
        this.length--;
        return this.items.pop();
    }

    // Peek at top element - O(1)
    peek() {
        if (this.isEmpty()) return null;
        return this.items[this.length - 1];
    }

    // Check if empty - O(1)
    isEmpty() {
        return this.length === 0;
    }

    // Get size - O(1)
    size() {
        return this.length;
    }

    // Print stack
    print() {
        return this.items.slice().reverse();
    }
}

// Stack using Linked List
class StackNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class StackLinkedList {
    constructor() {
        this.top = null;
        this.length = 0;
    }

    push(value) {
        const newNode = new StackNode(value);
        newNode.next = this.top;
        this.top = newNode;
        this.length++;
        return this;
    }

    pop() {
        if (this.isEmpty()) return null;
        const value = this.top.value;
        this.top = this.top.next;
        this.length--;
        return value;
    }

    peek() {
        if (this.isEmpty()) return null;
        return this.top.value;
    }

    isEmpty() {
        return this.top === null;
    }
}

// ==================== QUEUE ====================

class Queue {
    constructor() {
        this.items = [];
        this.length = 0;
    }

    // Enqueue (add to rear) - O(1)
    enqueue(value) {
        this.items.push(value);
        this.length++;
        return this;
    }

    // Dequeue (remove from front) - O(n) with array, O(1) with linked list
    dequeue() {
        if (this.isEmpty()) return null;
        this.length--;
        return this.items.shift();
    }

    // Front element - O(1)
    front() {
        if (this.isEmpty()) return null;
        return this.items[0];
    }

    // Rear element - O(1)
    rear() {
        if (this.isEmpty()) return null;
        return this.items[this.length - 1];
    }

    isEmpty() {
        return this.length === 0;
    }

    size() {
        return this.length;
    }

    print() {
        return this.items;
    }
}

// Queue using Linked List (better performance)
class QueueNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class QueueLinkedList {
    constructor() {
        this.front = null;
        this.rear = null;
        this.length = 0;
    }

    enqueue(value) {
        const newNode = new QueueNode(value);
        
        if (this.isEmpty()) {
            this.front = newNode;
            this.rear = newNode;
        } else {
            this.rear.next = newNode;
            this.rear = newNode;
        }
        this.length++;
        return this;
    }

    dequeue() {
        if (this.isEmpty()) return null;
        
        const value = this.front.value;
        this.front = this.front.next;
        
        if (!this.front) {
            this.rear = null;
        }
        
        this.length--;
        return value;
    }

    peek() {
        if (this.isEmpty()) return null;
        return this.front.value;
    }

    isEmpty() {
        return this.front === null;
    }
}

// ==================== COMMON STACK PROBLEMS ====================

// 1. Valid Parentheses - O(n) time, O(n) space
function isValidParentheses(s) {
    const stack = [];
    const pairs = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (const char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else if (char === ')' || char === '}' || char === ']') {
            if (stack.length === 0 || stack.pop() !== pairs[char]) {
                return false;
            }
        }
    }
    
    return stack.length === 0;
}

// 2. Next Greater Element - O(n) time, O(n) space
function nextGreaterElement(nums) {
    const result = new Array(nums.length).fill(-1);
    const stack = [];
    
    for (let i = 0; i < nums.length; i++) {
        while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
            const index = stack.pop();
            result[index] = nums[i];
        }
        stack.push(i);
    }
    
    return result;
}

// 3. Daily Temperatures - O(n) time, O(n) space
function dailyTemperatures(temperatures) {
    const result = new Array(temperatures.length).fill(0);
    const stack = [];
    
    for (let i = 0; i < temperatures.length; i++) {
        while (stack.length > 0 && temperatures[stack[stack.length - 1]] < temperatures[i]) {
            const index = stack.pop();
            result[index] = i - index;
        }
        stack.push(i);
    }
    
    return result;
}

// 4. Evaluate Reverse Polish Notation - O(n) time, O(n) space
function evalRPN(tokens) {
    const stack = [];
    
    for (const token of tokens) {
        if (token === '+' || token === '-' || token === '*' || token === '/') {
            const b = stack.pop();
            const a = stack.pop();
            
            switch (token) {
                case '+':
                    stack.push(a + b);
                    break;
                case '-':
                    stack.push(a - b);
                    break;
                case '*':
                    stack.push(a * b);
                    break;
                case '/':
                    stack.push(Math.trunc(a / b));
                    break;
            }
        } else {
            stack.push(parseInt(token));
        }
    }
    
    return stack[0];
}

// ==================== COMMON QUEUE PROBLEMS ====================

// 1. Generate Binary Numbers - O(n) time, O(n) space
function generateBinaryNumbers(n) {
    const result = [];
    const queue = new Queue();
    queue.enqueue('1');
    
    for (let i = 0; i < n; i++) {
        const binary = queue.dequeue();
        result.push(binary);
        
        queue.enqueue(binary + '0');
        queue.enqueue(binary + '1');
    }
    
    return result;
}

// 2. Sliding Window Maximum - O(n) time, O(k) space
function maxSlidingWindow(nums, k) {
    const result = [];
    const deque = []; // Store indices
    
    for (let i = 0; i < nums.length; i++) {
        // Remove indices outside window
        while (deque.length > 0 && deque[0] <= i - k) {
            deque.shift();
        }
        
        // Remove indices with smaller values
        while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }
        
        deque.push(i);
        
        // Add to result when window is complete
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }
    
    return result;
}

// ==================== TESTING ====================

console.log("=== Stack Operations ===");
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
console.log(stack.print()); // [30, 20, 10]
console.log(stack.peek()); // 30
console.log(stack.pop()); // 30
console.log(stack.size()); // 2

console.log("\n=== Queue Operations ===");
const queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
console.log(queue.print()); // [10, 20, 30]
console.log(queue.front()); // 10
console.log(queue.dequeue()); // 10
console.log(queue.size()); // 2

console.log("\n=== Valid Parentheses ===");
console.log(isValidParentheses("()[]{}")); // true
console.log(isValidParentheses("([)]")); // false

console.log("\n=== Next Greater Element ===");
console.log(nextGreaterElement([4, 5, 2, 10])); // [5, 10, 10, -1]

console.log("\n=== Daily Temperatures ===");
console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])); // [1, 1, 4, 2, 1, 1, 0, 0]

console.log("\n=== Evaluate RPN ===");
console.log(evalRPN(["2", "1", "+", "3", "*"])); // 9

console.log("\n=== Generate Binary Numbers ===");
console.log(generateBinaryNumbers(5)); // ['1', '10', '11', '100', '101']

