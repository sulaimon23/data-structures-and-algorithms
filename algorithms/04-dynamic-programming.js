/**
 * DYNAMIC PROGRAMMING - Implementation and Examples
 * Solve complex problems by breaking into simpler subproblems
 */

// ==================== MEMOIZATION HELPER ====================

function memoize(fn) {
    const cache = {};
    return function (...args) {
        const key = JSON.stringify(args);
        if (cache[key]) return cache[key];
        cache[key] = fn.apply(this, args);
        return cache[key];
    };
}

// ==================== FIBONACCI ====================

// Naive recursive - O(2^n) time, O(n) space
function fibonacciNaive(n) {
    if (n <= 1) return n;
    return fibonacciNaive(n - 1) + fibonacciNaive(n - 2);
}

// Memoized - O(n) time, O(n) space
const fibonacciMemo = memoize(function (n) {
    if (n <= 1) return n;
    return fibonacciMemo(n - 1) + fibonacciMemo(n - 2);
});

// Tabulation - O(n) time, O(n) space
function fibonacciTabulation(n) {
    if (n <= 1) return n;
    const dp = [0, 1];
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}

// Optimized - O(n) time, O(1) space
function fibonacciOptimized(n) {
    if (n <= 1) return n;
    let prev = 0,
        curr = 1;
    for (let i = 2; i <= n; i++) {
        [prev, curr] = [curr, prev + curr];
    }
    return curr;
}

// ==================== CLIMBING STAIRS ====================
// How many ways to reach top (1 or 2 steps at a time)
function climbStairs(n) {
    if (n <= 2) return n;
    let first = 1,
        second = 2;
    for (let i = 3; i <= n; i++) {
        [first, second] = [second, first + second];
    }
    return second;
}

// ==================== HOUSE ROBBER ====================
// Maximum money without robbing adjacent houses
function rob(houses) {
    if (houses.length === 0) return 0;
    if (houses.length === 1) return houses[0];

    let prev2 = houses[0];
    let prev1 = Math.max(houses[0], houses[1]);

    for (let i = 2; i < houses.length; i++) {
        const current = Math.max(prev1, prev2 + houses[i]);
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}

// ==================== COIN CHANGE ====================
// Minimum coins to make amount
function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
}

// ==================== LONGEST COMMON SUBSEQUENCE ====================
function longestCommonSubsequence(text1, text2) {
    const m = text1.length,
        n = text2.length;
    const dp = Array(m + 1)
        .fill(null)
        .map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[m][n];
}

// ==================== EDIT DISTANCE ====================
function editDistance(word1, word2) {
    const m = word1.length,
        n = word2.length;
    const dp = Array(m + 1)
        .fill(null)
        .map(() => Array(n + 1).fill(0));

    // Base cases
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] =
                    1 +
                    Math.min(
                        dp[i - 1][j], // Delete
                        dp[i][j - 1], // Insert
                        dp[i - 1][j - 1] // Replace
                    );
            }
        }
    }

    return dp[m][n];
}

// ==================== KNAPSACK PROBLEM ====================
// 0/1 Knapsack - O(n * W) time, O(n * W) space
function knapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = Array(n + 1)
        .fill(null)
        .map(() => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    dp[i - 1][w],
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    return dp[n][capacity];
}

// ==================== LONGEST INCREASING SUBSEQUENCE ====================
function lengthOfLIS(nums) {
    if (nums.length === 0) return 0;

    const dp = new Array(nums.length).fill(1);

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    return Math.max(...dp);
}

// ==================== UNIQUE PATHS ====================
// Grid paths from top-left to bottom-right
function uniquePaths(m, n) {
    const dp = Array(m)
        .fill(null)
        .map(() => Array(n).fill(1));

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }

    return dp[m - 1][n - 1];
}

// ==================== TESTING ====================

console.log("=== Fibonacci ===");
console.log("Naive (n=10):", fibonacciNaive(10));
console.log("Memoized (n=40):", fibonacciMemo(40));
console.log("Tabulation (n=40):", fibonacciTabulation(40));
console.log("Optimized (n=40):", fibonacciOptimized(40));

console.log("\n=== Climbing Stairs ===");
console.log("Ways to climb 5 stairs:", climbStairs(5)); // 8

console.log("\n=== House Robber ===");
console.log("Max money:", rob([2, 7, 9, 3, 1])); // 12

console.log("\n=== Coin Change ===");
console.log("Min coins:", coinChange([1, 2, 5], 11)); // 3

console.log("\n=== Longest Common Subsequence ===");
console.log("LCS:", longestCommonSubsequence("abcde", "ace")); // 3

console.log("\n=== Edit Distance ===");
console.log("Distance:", editDistance("horse", "ros")); // 3

console.log("\n=== Knapsack ===");
console.log("Max value:", knapsack([1, 3, 4, 5], [1, 4, 5, 7], 7)); // 9

console.log("\n=== Longest Increasing Subsequence ===");
console.log("LIS length:", lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // 4

console.log("\n=== Unique Paths ===");
console.log("Paths (3x7):", uniquePaths(3, 7)); // 28
