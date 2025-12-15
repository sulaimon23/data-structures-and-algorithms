/**
 * SEARCHING ALGORITHMS - Implementation and Examples
 * Various algorithms to find elements in data structures
 */

// ==================== LINEAR SEARCH ====================
// Time: O(n), Space: O(1)
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}

// ==================== BINARY SEARCH ====================
// Time: O(log n), Space: O(1) iterative, O(log n) recursive
// Requirement: Array must be sorted

// Iterative version
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

// Recursive version
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1;
    
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
        return mid;
    } else if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}

// ==================== BINARY SEARCH VARIATIONS ====================

// Find first occurrence
function findFirstOccurrence(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            result = mid;
            right = mid - 1; // Continue searching left
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

// Find last occurrence
function findLastOccurrence(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            result = mid;
            left = mid + 1; // Continue searching right
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

// Find insertion position (lower bound)
function findInsertionPosition(arr, target) {
    let left = 0;
    let right = arr.length;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}

// Search in rotated sorted array
function searchRotatedArray(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) return mid;
        
        // Left half is sorted
        if (arr[left] <= arr[mid]) {
            if (target >= arr[left] && target < arr[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        // Right half is sorted
        else {
            if (target > arr[mid] && target <= arr[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return -1;
}

// ==================== JUMP SEARCH ====================
// Time: O(√n), Space: O(1)
// Better than linear, worse than binary, but doesn't require sorted array
function jumpSearch(arr, target) {
    const n = arr.length;
    const step = Math.floor(Math.sqrt(n));
    let prev = 0;
    
    // Find the block where element might be
    while (arr[Math.min(step, n) - 1] < target) {
        prev = step;
        step += Math.floor(Math.sqrt(n));
        if (prev >= n) return -1;
    }
    
    // Linear search in the block
    while (arr[prev] < target) {
        prev++;
        if (prev === Math.min(step, n)) return -1;
    }
    
    if (arr[prev] === target) return prev;
    return -1;
}

// ==================== INTERPOLATION SEARCH ====================
// Time: O(log log n) average, O(n) worst, Space: O(1)
// Works best on uniformly distributed sorted arrays
function interpolationSearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right && target >= arr[left] && target <= arr[right]) {
        if (left === right) {
            if (arr[left] === target) return left;
            return -1;
        }
        
        // Formula for position
        const pos = left + Math.floor(
            ((right - left) / (arr[right] - arr[left])) * (target - arr[left])
        );
        
        if (arr[pos] === target) {
            return pos;
        } else if (arr[pos] < target) {
            left = pos + 1;
        } else {
            right = pos - 1;
        }
    }
    
    return -1;
}

// ==================== EXPONENTIAL SEARCH ====================
// Time: O(log n), Space: O(1)
// Useful for unbounded/infinite arrays
function exponentialSearch(arr, target) {
    if (arr[0] === target) return 0;
    
    let i = 1;
    while (i < arr.length && arr[i] <= target) {
        i *= 2;
    }
    
    // Binary search in the range
    return binarySearch(arr, target, Math.floor(i / 2), Math.min(i, arr.length - 1));
}

// ==================== STRING SEARCHING ====================

// Naive string search - O(n * m)
function naiveStringSearch(text, pattern) {
    const matches = [];
    const n = text.length;
    const m = pattern.length;
    
    for (let i = 0; i <= n - m; i++) {
        let j = 0;
        while (j < m && text[i + j] === pattern[j]) {
            j++;
        }
        if (j === m) {
            matches.push(i);
        }
    }
    
    return matches;
}

// KMP Algorithm - O(n + m)
function kmpSearch(text, pattern) {
    const lps = computeLPS(pattern);
    const matches = [];
    let i = 0; // index for text
    let j = 0; // index for pattern
    
    while (i < text.length) {
        if (text[i] === pattern[j]) {
            i++;
            j++;
        }
        
        if (j === pattern.length) {
            matches.push(i - j);
            j = lps[j - 1];
        } else if (i < text.length && text[i] !== pattern[j]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    
    return matches;
}

function computeLPS(pattern) {
    const lps = new Array(pattern.length).fill(0);
    let len = 0;
    let i = 1;
    
    while (i < pattern.length) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    
    return lps;
}

// ==================== TESTING ====================

console.log("=== Linear Search ===");
const arr1 = [10, 20, 30, 40, 50];
console.log(linearSearch(arr1, 30)); // 2
console.log(linearSearch(arr1, 60)); // -1

console.log("\n=== Binary Search ===");
const sortedArr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log("Array:", sortedArr);
console.log("Search 7:", binarySearch(sortedArr, 7)); // 3
console.log("Search 12:", binarySearch(sortedArr, 12)); // -1
console.log("Recursive search 7:", binarySearchRecursive(sortedArr, 7)); // 3

console.log("\n=== Binary Search Variations ===");
const arrWithDuplicates = [1, 2, 2, 2, 3, 4, 4, 5];
console.log("Array:", arrWithDuplicates);
console.log("First occurrence of 2:", findFirstOccurrence(arrWithDuplicates, 2)); // 1
console.log("Last occurrence of 2:", findLastOccurrence(arrWithDuplicates, 2)); // 3
console.log("Insertion position for 2.5:", findInsertionPosition(arrWithDuplicates, 2.5)); // 4

console.log("\n=== Rotated Array Search ===");
const rotated = [4, 5, 6, 7, 0, 1, 2];
console.log("Rotated array:", rotated);
console.log("Search 0:", searchRotatedArray(rotated, 0)); // 4
console.log("Search 3:", searchRotatedArray(rotated, 3)); // -1

console.log("\n=== String Search ===");
const text = "ABABDABACDABABCABC";
const pattern = "ABABCABC";
console.log("Text:", text);
console.log("Pattern:", pattern);
console.log("Naive search:", naiveStringSearch(text, "AB")); // [0, 2, 6, 10, 12, 14]
console.log("KMP search:", kmpSearch(text, pattern)); // [10]

