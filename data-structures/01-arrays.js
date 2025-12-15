/**
 * ARRAYS - Implementation and Examples
 * Arrays are collections of elements stored at contiguous memory locations
 */

// ==================== BASIC ARRAY OPERATIONS ====================

class MyArray {
    constructor() {
        this.length = 0;
        this.data = {};
    }

    // Get element at index - O(1)
    get(index) {
        return this.data[index];
    }

    // Add element at end - O(1)
    push(item) {
        this.data[this.length] = item;
        this.length++;
        return this.length;
    }

    // Remove last element - O(1)
    pop() {
        if (this.length === 0) return undefined;
        const lastItem = this.data[this.length - 1];
        delete this.data[this.length - 1];
        this.length--;
        return lastItem;
    }

    // Delete element at index - O(n)
    delete(index) {
        const item = this.data[index];
        this.shiftItems(index);
        return item;
    }

    // Shift items after deletion - O(n)
    shiftItems(index) {
        for (let i = index; i < this.length - 1; i++) {
            this.data[i] = this.data[i + 1];
        }
        delete this.data[this.length - 1];
        this.length--;
    }

    // Insert element at index - O(n)
    insert(index, item) {
        for (let i = this.length; i > index; i--) {
            this.data[i] = this.data[i - 1];
        }
        this.data[index] = item;
        this.length++;
    }
}

// ==================== COMMON ARRAY PROBLEMS ====================

// 1. Reverse an Array - O(n) time, O(1) space
function reverseArray(arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    return arr;
}

// 2. Find Maximum Element - O(n) time, O(1) space
function findMax(arr) {
    if (arr.length === 0) return null;

    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

// 3. Two Sum - O(n) time, O(n) space
function twoSum(arr, target) {
    const map = new Map();

    for (let i = 0; i < arr.length; i++) {
        const complement = target - arr[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(arr[i], i);
    }
    return [];
}

// 4. Move Zeros to End - O(n) time, O(1) space
function moveZeros(arr) {
    let writeIndex = 0;

    // Move all non-zero elements to front
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) {
            arr[writeIndex++] = arr[i];
        }
    }

    // Fill remaining with zeros
    while (writeIndex < arr.length) {
        arr[writeIndex++] = 0;
    }

    return arr;
}

// 5. Merge Sorted Arrays - O(n + m) time, O(n + m) space
function mergeSortedArrays(arr1, arr2) {
    const merged = [];
    let i = 0,
        j = 0;

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] <= arr2[j]) {
            merged.push(arr1[i++]);
        } else {
            merged.push(arr2[j++]);
        }
    }

    // Add remaining elements
    while (i < arr1.length) merged.push(arr1[i++]);
    while (j < arr2.length) merged.push(arr2[j++]);

    return merged;
}

// 6. Contains Duplicate - O(n) time, O(n) space
function containsDuplicate(arr) {
    const seen = new Set();
    for (const num of arr) {
        if (seen.has(num)) return true;
        seen.add(num);
    }
    return false;
}

// 7. Rotate Array - O(n) time, O(1) space
function rotateArray(arr, k) {
    k = k % arr.length;
    if (k === 0) return arr;

    // Reverse entire array
    reverse(arr, 0, arr.length - 1);
    // Reverse first k elements
    reverse(arr, 0, k - 1);
    // Reverse remaining elements
    reverse(arr, k, arr.length - 1);

    return arr;
}

function reverse(arr, start, end) {
    while (start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]];
        start++;
        end--;
    }
}

// ==================== TESTING ====================

console.log("=== Array Operations ===");
const myArray = new MyArray();
myArray.push("hi");
myArray.push("you");
myArray.push("!");
console.log(myArray.get(0)); // 'hi'
myArray.delete(1);
console.log(myArray); // { length: 2, data: { '0': 'hi', '1': '!' } }

console.log("\n=== Reverse Array ===");
console.log(reverseArray([1, 2, 3, 4, 5])); // [5, 4, 3, 2, 1]

console.log("\n=== Two Sum ===");
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]

console.log("\n=== Move Zeros ===");
console.log(moveZeros([0, 1, 0, 3, 12])); // [1, 3, 12, 0, 0]

console.log("\n=== Merge Sorted Arrays ===");
console.log(mergeSortedArrays([1, 3, 5], [2, 4, 6])); // [1, 2, 3, 4, 5, 6]

console.log("\n=== Rotate Array ===");
console.log(rotateArray([1, 2, 3, 4, 5], 2)); // [4, 5, 1, 2, 3]
