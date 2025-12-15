/**
 * PRACTICE PROBLEMS - Solutions with Explanations
 * Practice these problems to master DSA
 */

// ==================== EASY PROBLEMS ====================

// 1. Two Sum
// Find two numbers that add up to target
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}

// 2. Valid Parentheses
function isValid(s) {
    const stack = [];
    const pairs = { ')': '(', '}': '{', ']': '[' };
    
    for (const char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else {
            if (stack.length === 0 || stack.pop() !== pairs[char]) {
                return false;
            }
        }
    }
    return stack.length === 0;
}

// 3. Maximum Subarray (Kadane's Algorithm)
function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}

// 4. Contains Duplicate
function containsDuplicate(nums) {
    return new Set(nums).size !== nums.length;
}

// 5. Best Time to Buy and Sell Stock
function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    
    for (const price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    
    return maxProfit;
}

// ==================== MEDIUM PROBLEMS ====================

// 6. Add Two Numbers (Linked Lists)
function addTwoNumbers(l1, l2) {
    const dummy = new ListNode(0);
    let current = dummy;
    let carry = 0;
    
    while (l1 || l2 || carry) {
        const sum = (l1?.val || 0) + (l2?.val || 0) + carry;
        carry = Math.floor(sum / 10);
        current.next = new ListNode(sum % 10);
        current = current.next;
        l1 = l1?.next;
        l2 = l2?.next;
    }
    
    return dummy.next;
}

// 7. Longest Substring Without Repeating Characters
function lengthOfLongestSubstring(s) {
    const map = new Map();
    let maxLen = 0;
    let start = 0;
    
    for (let end = 0; end < s.length; end++) {
        if (map.has(s[end])) {
            start = Math.max(start, map.get(s[end]) + 1);
        }
        map.set(s[end], end);
        maxLen = Math.max(maxLen, end - start + 1);
    }
    
    return maxLen;
}

// 8. Container With Most Water
function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxArea = 0;
    
    while (left < right) {
        const area = Math.min(height[left], height[right]) * (right - left);
        maxArea = Math.max(maxArea, area);
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxArea;
}

// 9. 3Sum
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
}

// 10. Merge Intervals
function merge(intervals) {
    if (intervals.length === 0) return [];
    
    intervals.sort((a, b) => a[0] - b[0]);
    const merged = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const last = merged[merged.length - 1];
        
        if (current[0] <= last[1]) {
            last[1] = Math.max(last[1], current[1]);
        } else {
            merged.push(current);
        }
    }
    
    return merged;
}

// ==================== HARD PROBLEMS ====================

// 11. Trapping Rain Water
function trap(height) {
    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let water = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }
    
    return water;
}

// 12. Merge k Sorted Lists
function mergeKLists(lists) {
    if (lists.length === 0) return null;
    
    while (lists.length > 1) {
        const merged = [];
        for (let i = 0; i < lists.length; i += 2) {
            const l1 = lists[i];
            const l2 = (i + 1 < lists.length) ? lists[i + 1] : null;
            merged.push(mergeTwoLists(l1, l2));
        }
        lists = merged;
    }
    
    return lists[0];
}

function mergeTwoLists(l1, l2) {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (l1 && l2) {
        if (l1.val <= l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }
    
    current.next = l1 || l2;
    return dummy.next;
}

// Helper class for linked list problems
class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

// ==================== TESTING ====================

console.log("=== Easy Problems ===");
console.log("Two Sum:", twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log("Valid Parentheses:", isValid("()[]{}")); // true
console.log("Max Subarray:", maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6
console.log("Contains Duplicate:", containsDuplicate([1, 2, 3, 1])); // true
console.log("Max Profit:", maxProfit([7, 1, 5, 3, 6, 4])); // 5

console.log("\n=== Medium Problems ===");
console.log("Longest Substring:", lengthOfLongestSubstring("abcabcbb")); // 3
console.log("Max Area:", maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49
console.log("3Sum:", threeSum([-1, 0, 1, 2, -1, -4])); // [[-1, -1, 2], [-1, 0, 1]]
console.log("Merge Intervals:", merge([[1, 3], [2, 6], [8, 10], [15, 18]])); // [[1, 6], [8, 10], [15, 18]]

console.log("\n=== Hard Problems ===");
console.log("Trapping Rain Water:", trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6

