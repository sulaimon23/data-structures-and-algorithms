/**
 * LINKED LISTS - Implementation and Examples
 * Linear collection of nodes where each node points to the next
 */

// ==================== NODE CLASS ====================

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

// ==================== SINGLY LINKED LIST ====================

class LinkedList {
    constructor(value) {
        this.head = value ? new Node(value) : null;
        this.tail = this.head;
        this.length = value ? 1 : 0;
    }

    // Append to end - O(1)
    append(value) {
        const newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }

    // Prepend to start - O(1)
    prepend(value) {
        const newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }

    // Insert at index - O(n)
    insert(index, value) {
        if (index === 0) {
            return this.prepend(value);
        }

        if (index >= this.length) {
            return this.append(value);
        }

        const newNode = new Node(value);
        const leader = this.traverseToIndex(index - 1);
        const holdingPointer = leader.next;

        leader.next = newNode;
        newNode.next = holdingPointer;
        this.length++;
        return this;
    }

    // Delete at index - O(n)
    delete(index) {
        if (index === 0) {
            const value = this.head.value;
            this.head = this.head.next;
            this.length--;
            if (this.length === 0) this.tail = null;
            return value;
        }

        const leader = this.traverseToIndex(index - 1);
        const nodeToDelete = leader.next;
        leader.next = nodeToDelete.next;

        if (index === this.length - 1) {
            this.tail = leader;
        }

        this.length--;
        return nodeToDelete.value;
    }

    // Traverse to index - O(n)
    traverseToIndex(index) {
        let counter = 0;
        let currentNode = this.head;

        while (counter !== index) {
            currentNode = currentNode.next;
            counter++;
        }
        return currentNode;
    }

    // Reverse linked list - O(n) time, O(1) space
    reverse() {
        if (!this.head || !this.head.next) return this;

        let prev = null;
        let current = this.head;
        this.tail = this.head;

        while (current) {
            const next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }

        this.head = prev;
        return this;
    }

    // Print as array
    printList() {
        const array = [];
        let currentNode = this.head;

        while (currentNode !== null) {
            array.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return array;
    }
}

// ==================== DOUBLY LINKED LIST ====================

class DoublyNode {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor(value) {
        this.head = value ? new DoublyNode(value) : null;
        this.tail = this.head;
        this.length = value ? 1 : 0;
    }

    append(value) {
        const newNode = new DoublyNode(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }

    prepend(value) {
        const newNode = new DoublyNode(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.length++;
        return this;
    }

    printList() {
        const array = [];
        let currentNode = this.head;
        while (currentNode !== null) {
            array.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return array;
    }
}

// ==================== COMMON LINKED LIST PROBLEMS ====================

// 1. Find Middle Node - O(n) time, O(1) space
function findMiddle(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}

// 2. Detect Cycle (Floyd's Algorithm) - O(n) time, O(1) space
function hasCycle(head) {
    if (!head || !head.next) return false;

    let slow = head;
    let fast = head.next;

    while (fast && fast.next) {
        if (slow === fast) return true;
        slow = slow.next;
        fast = fast.next.next;
    }
    return false;
}

// 3. Merge Two Sorted Lists - O(n + m) time, O(1) space
function mergeTwoLists(list1, list2) {
    const dummy = new Node(0);
    let current = dummy;

    while (list1 && list2) {
        if (list1.value <= list2.value) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }

    current.next = list1 || list2;
    return dummy.next;
}

// 4. Remove Nth Node From End - O(n) time, O(1) space
function removeNthFromEnd(head, n) {
    const dummy = new Node(0);
    dummy.next = head;

    let first = dummy;
    let second = dummy;

    // Move first pointer n+1 steps ahead
    for (let i = 0; i <= n; i++) {
        first = first.next;
    }

    // Move both pointers until first reaches end
    while (first) {
        first = first.next;
        second = second.next;
    }

    second.next = second.next.next;
    return dummy.next;
}

// 5. Reverse Linked List (Iterative) - O(n) time, O(1) space
function reverseList(head) {
    let prev = null;
    let current = head;

    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }

    return prev;
}

// 6. Reverse Linked List (Recursive) - O(n) time, O(n) space
function reverseListRecursive(head) {
    if (!head || !head.next) return head;

    const reversed = reverseListRecursive(head.next);
    head.next.next = head;
    head.next = null;

    return reversed;
}

// 7. Palindrome Check - O(n) time, O(1) space
function isPalindrome(head) {
    if (!head || !head.next) return true;

    // Find middle
    let slow = head;
    let fast = head;
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // Reverse second half
    let secondHalf = reverseList(slow.next);
    let firstHalf = head;

    // Compare
    while (secondHalf) {
        if (firstHalf.value !== secondHalf.value) return false;
        firstHalf = firstHalf.next;
        secondHalf = secondHalf.next;
    }

    return true;
}

// ==================== TESTING ====================

console.log("=== Singly Linked List ===");
const myLinkedList = new LinkedList(10);
myLinkedList.append(5);
myLinkedList.append(16);
myLinkedList.prepend(1);
myLinkedList.insert(2, 99);
console.log(myLinkedList.printList()); // [1, 10, 99, 5, 16]
myLinkedList.delete(2);
console.log(myLinkedList.printList()); // [1, 10, 5, 16]
myLinkedList.reverse();
console.log(myLinkedList.printList()); // [16, 5, 10, 1]

console.log("\n=== Doubly Linked List ===");
const myDoublyLinkedList = new DoublyLinkedList(10);
myDoublyLinkedList.append(5);
myDoublyLinkedList.append(16);
myDoublyLinkedList.prepend(1);
console.log(myDoublyLinkedList.printList()); // [1, 10, 5, 16]
