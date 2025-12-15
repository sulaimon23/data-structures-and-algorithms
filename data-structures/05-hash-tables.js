/**
 * HASH TABLES - Implementation and Examples
 * Key-value pairs with fast lookup using hash function
 */

// ==================== HASH TABLE IMPLEMENTATION ====================

class HashTable {
    constructor(size = 53) {
        this.keyMap = new Array(size);
    }

    // Hash function - converts key to index
    _hash(key) {
        let total = 0;
        const WEIRD_PRIME = 31;
        
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            const char = key[i];
            const value = char.charCodeAt(0) - 96;
            total = (total * WEIRD_PRIME + value) % this.keyMap.length;
        }
        
        return total;
    }

    // Set key-value pair - O(1) average
    set(key, value) {
        const index = this._hash(key);
        
        if (!this.keyMap[index]) {
            this.keyMap[index] = [];
        }
        
        // Check if key already exists and update
        const existingPair = this.keyMap[index].find(pair => pair[0] === key);
        if (existingPair) {
            existingPair[1] = value;
        } else {
            this.keyMap[index].push([key, value]);
        }
        
        return this;
    }

    // Get value by key - O(1) average
    get(key) {
        const index = this._hash(key);
        
        if (this.keyMap[index]) {
            const pair = this.keyMap[index].find(pair => pair[0] === key);
            return pair ? pair[1] : undefined;
        }
        
        return undefined;
    }

    // Delete key-value pair - O(1) average
    delete(key) {
        const index = this._hash(key);
        
        if (this.keyMap[index]) {
            const pairIndex = this.keyMap[index].findIndex(pair => pair[0] === key);
            if (pairIndex !== -1) {
                const deleted = this.keyMap[index].splice(pairIndex, 1);
                return deleted[0][1];
            }
        }
        
        return undefined;
    }

    // Get all keys - O(n)
    keys() {
        const keysArr = [];
        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    if (!keysArr.includes(this.keyMap[i][j][0])) {
                        keysArr.push(this.keyMap[i][j][0]);
                    }
                }
            }
        }
        return keysArr;
    }

    // Get all values - O(n)
    values() {
        const valuesArr = [];
        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    if (!valuesArr.includes(this.keyMap[i][j][1])) {
                        valuesArr.push(this.keyMap[i][j][1]);
                    }
                }
            }
        }
        return valuesArr;
    }
}

// ==================== USING BUILT-IN MAP ====================

// JavaScript's built-in Map is a hash table implementation
function demonstrateMap() {
    const map = new Map();
    
    // Set - O(1)
    map.set('name', 'John');
    map.set('age', 30);
    map.set('city', 'New York');
    
    // Get - O(1)
    console.log(map.get('name')); // 'John'
    
    // Has - O(1)
    console.log(map.has('age')); // true
    
    // Delete - O(1)
    map.delete('city');
    
    // Size - O(1)
    console.log(map.size); // 2
    
    // Iterate
    for (const [key, value] of map) {
        console.log(`${key}: ${value}`);
    }
    
    return map;
}

// ==================== USING BUILT-IN SET ====================

// Set is like a hash table that only stores keys
function demonstrateSet() {
    const set = new Set();
    
    // Add - O(1)
    set.add(1);
    set.add(2);
    set.add(3);
    set.add(2); // Duplicate, won't be added
    
    // Has - O(1)
    console.log(set.has(2)); // true
    
    // Delete - O(1)
    set.delete(3);
    
    // Size - O(1)
    console.log(set.size); // 2
    
    // Iterate
    for (const value of set) {
        console.log(value);
    }
    
    return set;
}

// ==================== COMMON HASH TABLE PROBLEMS ====================

// 1. Two Sum (using hash table)
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

// 2. Group Anagrams
function groupAnagrams(strs) {
    const map = new Map();
    
    for (const str of strs) {
        const sorted = str.split('').sort().join('');
        if (!map.has(sorted)) {
            map.set(sorted, []);
        }
        map.get(sorted).push(str);
    }
    
    return Array.from(map.values());
}

// 3. First Unique Character
function firstUniqChar(s) {
    const map = new Map();
    
    // Count occurrences
    for (const char of s) {
        map.set(char, (map.get(char) || 0) + 1);
    }
    
    // Find first unique
    for (let i = 0; i < s.length; i++) {
        if (map.get(s[i]) === 1) {
            return i;
        }
    }
    
    return -1;
}

// 4. Contains Duplicate
function containsDuplicate(nums) {
    const set = new Set();
    
    for (const num of nums) {
        if (set.has(num)) {
            return true;
        }
        set.add(num);
    }
    
    return false;
}

// 5. Longest Consecutive Sequence
function longestConsecutive(nums) {
    if (nums.length === 0) return 0;
    
    const set = new Set(nums);
    let maxLength = 0;
    
    for (const num of set) {
        // Only start counting if this is the start of a sequence
        if (!set.has(num - 1)) {
            let currentNum = num;
            let currentLength = 1;
            
            while (set.has(currentNum + 1)) {
                currentNum++;
                currentLength++;
            }
            
            maxLength = Math.max(maxLength, currentLength);
        }
    }
    
    return maxLength;
}

// 6. Valid Anagram
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    
    const map = new Map();
    
    // Count characters in s
    for (const char of s) {
        map.set(char, (map.get(char) || 0) + 1);
    }
    
    // Decrement for characters in t
    for (const char of t) {
        if (!map.has(char) || map.get(char) === 0) {
            return false;
        }
        map.set(char, map.get(char) - 1);
    }
    
    return true;
}

// 7. Word Pattern
function wordPattern(pattern, s) {
    const words = s.split(' ');
    if (pattern.length !== words.length) return false;
    
    const charToWord = new Map();
    const wordToChar = new Map();
    
    for (let i = 0; i < pattern.length; i++) {
        const char = pattern[i];
        const word = words[i];
        
        if (charToWord.has(char) && charToWord.get(char) !== word) {
            return false;
        }
        if (wordToChar.has(word) && wordToChar.get(word) !== char) {
            return false;
        }
        
        charToWord.set(char, word);
        wordToChar.set(word, char);
    }
    
    return true;
}

// ==================== TESTING ====================

console.log("=== Custom Hash Table ===");
const ht = new HashTable(17);
ht.set("maroon", "#800000");
ht.set("yellow", "#FFFF00");
ht.set("olive", "#808000");
ht.set("salmon", "#FA8072");
ht.set("lightcoral", "#F08080");
ht.set("mediumvioletred", "#C71585");
ht.set("plum", "#DDA0DD");

console.log(ht.get("yellow")); // "#FFFF00"
console.log(ht.keys()); // ['maroon', 'yellow', 'olive', 'salmon', 'lightcoral', 'mediumvioletred', 'plum']
console.log(ht.values()); // ['#800000', '#FFFF00', '#808000', '#FA8072', '#F08080', '#C71585', '#DDA0DD']

console.log("\n=== Built-in Map ===");
demonstrateMap();

console.log("\n=== Built-in Set ===");
demonstrateSet();

console.log("\n=== Hash Table Problems ===");
console.log("Two Sum:", twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log("Group Anagrams:", groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
console.log("First Unique Char:", firstUniqChar("leetcode")); // 0
console.log("Contains Duplicate:", containsDuplicate([1, 2, 3, 1])); // true
console.log("Longest Consecutive:", longestConsecutive([100, 4, 200, 1, 3, 2])); // 4
console.log("Is Anagram:", isAnagram("anagram", "nagaram")); // true
console.log("Word Pattern:", wordPattern("abba", "dog cat cat dog")); // true

