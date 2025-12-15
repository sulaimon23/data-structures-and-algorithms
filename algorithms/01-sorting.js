/**
 * SORTING ALGORITHMS - Implementation and Examples
 * Various algorithms to sort arrays in ascending order
 */

// ==================== BUBBLE SORT ====================
// Time: O(n²), Space: O(1), Stable: Yes
function bubbleSort(arr) {
    const n = arr.length;
    const result = [...arr];
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (result[j] > result[j + 1]) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
                swapped = true;
            }
        }
        
        // Optimization: If no swap, array is sorted
        if (!swapped) break;
    }
    
    return result;
}

// ==================== SELECTION SORT ====================
// Time: O(n²), Space: O(1), Stable: No
function selectionSort(arr) {
    const n = arr.length;
    const result = [...arr];
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        // Find minimum in unsorted portion
        for (let j = i + 1; j < n; j++) {
            if (result[j] < result[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap if minimum is not at current position
        if (minIndex !== i) {
            [result[i], result[minIndex]] = [result[minIndex], result[i]];
        }
    }
    
    return result;
}

// ==================== INSERTION SORT ====================
// Time: O(n²) worst, O(n) best, Space: O(1), Stable: Yes
function insertionSort(arr) {
    const result = [...arr];
    
    for (let i = 1; i < result.length; i++) {
        const key = result[i];
        let j = i - 1;
        
        // Move elements greater than key one position ahead
        while (j >= 0 && result[j] > key) {
            result[j + 1] = result[j];
            j--;
        }
        
        result[j + 1] = key;
    }
    
    return result;
}

// ==================== MERGE SORT ====================
// Time: O(n log n), Space: O(n), Stable: Yes
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    // Add remaining elements
    while (i < left.length) result.push(left[i++]);
    while (j < right.length) result.push(right[j++]);
    
    return result;
}

// ==================== QUICK SORT ====================
// Time: O(n log n) average, O(n²) worst, Space: O(log n), Stable: No
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

// ==================== HEAP SORT ====================
// Time: O(n log n), Space: O(1), Stable: No
function heapSort(arr) {
    const n = arr.length;
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
    
    return arr;
}

function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

// ==================== COUNTING SORT ====================
// Time: O(n + k), Space: O(k), Stable: Yes (for integers in range)
function countingSort(arr, maxValue) {
    const count = new Array(maxValue + 1).fill(0);
    const output = new Array(arr.length);
    
    // Count occurrences
    for (const num of arr) {
        count[num]++;
    }
    
    // Cumulative count
    for (let i = 1; i <= maxValue; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    
    return output;
}

// ==================== RADIX SORT ====================
// Time: O(d * (n + k)), Space: O(n + k), Stable: Yes (for integers)
function radixSort(arr) {
    const max = Math.max(...arr);
    
    // Do counting sort for every digit
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
    
    return arr;
}

function countingSortByDigit(arr, exp) {
    const output = new Array(arr.length);
    const count = new Array(10).fill(0);
    
    // Count occurrences
    for (let i = 0; i < arr.length; i++) {
        count[Math.floor(arr[i] / exp) % 10]++;
    }
    
    // Cumulative count
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    
    // Copy output to original array
    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
    }
}

// ==================== COMPARISON AND TESTING ====================

function testSortingAlgorithm(sortFn, name, arr) {
    const start = performance.now();
    const sorted = sortFn([...arr]);
    const end = performance.now();
    const time = (end - start).toFixed(4);
    
    console.log(`${name}:`);
    console.log(`  Time: ${time}ms`);
    console.log(`  Sorted: ${isSorted(sorted) ? '✓' : '✗'}`);
    console.log(`  Result: [${sorted.slice(0, 10).join(', ')}${sorted.length > 10 ? '...' : ''}]`);
    console.log();
}

function isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) return false;
    }
    return true;
}

// ==================== TESTING ====================

console.log("=== Sorting Algorithms Comparison ===\n");

const testArray = [64, 34, 25, 12, 22, 11, 90, 5, 77, 50];
const largeArray = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));

console.log("Original array:", testArray);
console.log("\n--- Small Array Tests ---\n");

testSortingAlgorithm(bubbleSort, "Bubble Sort", testArray);
testSortingAlgorithm(selectionSort, "Selection Sort", testArray);
testSortingAlgorithm(insertionSort, "Insertion Sort", testArray);
testSortingAlgorithm(mergeSort, "Merge Sort", testArray);
testSortingAlgorithm((arr) => quickSort([...arr]), "Quick Sort", testArray);
testSortingAlgorithm((arr) => heapSort([...arr]), "Heap Sort", testArray);

console.log("--- Large Array (1000 elements) Tests ---\n");
testSortingAlgorithm(mergeSort, "Merge Sort", largeArray);
testSortingAlgorithm((arr) => quickSort([...arr]), "Quick Sort", largeArray);
testSortingAlgorithm((arr) => heapSort([...arr]), "Heap Sort", largeArray);

console.log("=== Specialized Sorts ===\n");
const integerArray = [4, 2, 2, 8, 3, 3, 1];
console.log("Counting Sort:", countingSort([...integerArray], 8));
console.log("Radix Sort:", radixSort([170, 45, 75, 90, 2, 802, 24, 66]));

