# Data Structures and Algorithms - Complete Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Data Structures](#data-structures)
3. [Algorithms](#algorithms)
4. [Time & Space Complexity](#time--space-complexity)
5. [Practice Problems](#practice-problems)

---

## Introduction

### What are Data Structures?
Data structures are ways of organizing and storing data in a computer so that it can be accessed and modified efficiently. Think of them as containers that hold data in specific arrangements.

### What are Algorithms?
Algorithms are step-by-step procedures or formulas for solving problems. They define how to perform operations on data structures.

### Why Learn DSA?
- **Problem Solving**: Helps you think systematically
- **Efficiency**: Write faster, more memory-efficient code
- **Interviews**: Essential for technical interviews
- **Better Code**: Understand trade-offs in your solutions

---

## Data Structures

### 1. Arrays
**Definition**: A collection of elements stored at contiguous memory locations.

**Characteristics**:
- Indexed access (O(1))
- Fixed or dynamic size
- Sequential storage

**Operations**:
- Access: O(1)
- Search: O(n)
- Insertion: O(n)
- Deletion: O(n)

### 2. Linked Lists
**Definition**: A linear collection of nodes where each node points to the next.

**Types**:
- **Singly Linked List**: Each node points to the next
- **Doubly Linked List**: Each node points to both next and previous
- **Circular Linked List**: Last node points back to first

**Operations**:
- Access: O(n)
- Search: O(n)
- Insertion: O(1) at head, O(n) at position
- Deletion: O(1) at head, O(n) at position

### 3. Stacks
**Definition**: LIFO (Last In, First Out) structure - like a stack of plates.

**Operations**:
- Push: O(1)
- Pop: O(1)
- Peek: O(1)

**Use Cases**: Function calls, undo operations, expression evaluation

### 4. Queues
**Definition**: FIFO (First In, First Out) structure - like a line at a store.

**Types**:
- **Simple Queue**: Basic FIFO
- **Priority Queue**: Elements with priorities
- **Circular Queue**: Ring buffer

**Operations**:
- Enqueue: O(1)
- Dequeue: O(1)
- Front: O(1)

**Use Cases**: Task scheduling, BFS, request handling

### 5. Trees
**Definition**: Hierarchical structure with nodes and edges.

**Types**:
- **Binary Tree**: Each node has at most 2 children
- **Binary Search Tree (BST)**: Left < Parent < Right
- **AVL Tree**: Self-balancing BST
- **Heap**: Complete binary tree with heap property

**Tree Traversals**:
- Inorder: Left → Root → Right
- Preorder: Root → Left → Right
- Postorder: Left → Right → Root
- Level-order: Level by level (BFS)

**Operations** (BST):
- Search: O(log n) average, O(n) worst
- Insert: O(log n) average, O(n) worst
- Delete: O(log n) average, O(n) worst

### 6. Graphs
**Definition**: Collection of nodes (vertices) connected by edges.

**Types**:
- **Directed**: Edges have direction
- **Undirected**: Edges are bidirectional
- **Weighted**: Edges have weights

**Representations**:
- Adjacency Matrix: 2D array
- Adjacency List: Array of lists

**Traversals**:
- **DFS (Depth-First Search)**: Go deep before wide
- **BFS (Breadth-First Search)**: Go wide before deep

### 7. Hash Tables
**Definition**: Key-value pairs with fast lookup using hash function.

**Operations**:
- Insert: O(1) average, O(n) worst
- Search: O(1) average, O(n) worst
- Delete: O(1) average, O(n) worst

**Collision Handling**:
- Chaining: Linked list at each bucket
- Open Addressing: Find next available slot

---

## Algorithms

### 1. Sorting Algorithms

#### Bubble Sort
- **Time**: O(n²)
- **Space**: O(1)
- **Stable**: Yes
- **How**: Compare adjacent elements, swap if wrong order

#### Selection Sort
- **Time**: O(n²)
- **Space**: O(1)
- **Stable**: No
- **How**: Find minimum, swap with first position

#### Insertion Sort
- **Time**: O(n²) worst, O(n) best
- **Space**: O(1)
- **Stable**: Yes
- **How**: Build sorted array one element at a time

#### Merge Sort
- **Time**: O(n log n)
- **Space**: O(n)
- **Stable**: Yes
- **How**: Divide array, sort halves, merge

#### Quick Sort
- **Time**: O(n log n) average, O(n²) worst
- **Space**: O(log n)
- **Stable**: No
- **How**: Pick pivot, partition, recursively sort

#### Heap Sort
- **Time**: O(n log n)
- **Space**: O(1)
- **Stable**: No
- **How**: Build heap, extract max repeatedly

### 2. Searching Algorithms

#### Linear Search
- **Time**: O(n)
- **How**: Check each element sequentially

#### Binary Search
- **Time**: O(log n)
- **Requirement**: Sorted array
- **How**: Compare with middle, eliminate half

### 3. Graph Algorithms

#### DFS (Depth-First Search)
- **Time**: O(V + E)
- **Space**: O(V)
- **Use**: Path finding, cycle detection, topological sort

#### BFS (Breadth-First Search)
- **Time**: O(V + E)
- **Space**: O(V)
- **Use**: Shortest path (unweighted), level-order traversal

#### Dijkstra's Algorithm
- **Time**: O((V + E) log V) with heap
- **Use**: Shortest path in weighted graphs (non-negative)

### 4. Dynamic Programming
**Definition**: Solve complex problems by breaking into simpler subproblems.

**Key Concepts**:
- **Memoization**: Store results of expensive calls
- **Tabulation**: Build table bottom-up
- **Optimal Substructure**: Optimal solution contains optimal sub-solutions
- **Overlapping Subproblems**: Same subproblems recur

**Examples**:
- Fibonacci
- Longest Common Subsequence
- Knapsack Problem
- Edit Distance

### 5. Greedy Algorithms
**Definition**: Make locally optimal choice at each step.

**Characteristics**:
- Greedy Choice Property
- Optimal Substructure

**Examples**:
- Activity Selection
- Fractional Knapsack
- Huffman Coding
- Minimum Spanning Tree (Kruskal, Prim)

---

## Time & Space Complexity

### Big O Notation
Describes how algorithm performance scales with input size.

**Common Complexities** (from fastest to slowest):
- O(1): Constant - Instant
- O(log n): Logarithmic - Very fast
- O(n): Linear - Proportional to input
- O(n log n): Linearithmic - Good for sorting
- O(n²): Quadratic - Nested loops
- O(2ⁿ): Exponential - Very slow
- O(n!): Factorial - Extremely slow

### Space Complexity
Amount of memory used by algorithm.

**Types**:
- **Auxiliary Space**: Extra space (excluding input)
- **Total Space**: Input + auxiliary space

---

## Practice Problems

### Easy
1. Two Sum
2. Reverse Linked List
3. Valid Parentheses
4. Maximum Subarray
5. Contains Duplicate

### Medium
1. Add Two Numbers
2. Longest Substring Without Repeating Characters
3. Container With Most Water
4. 3Sum
5. Merge Intervals

### Hard
1. Trapping Rain Water
2. Serialize and Deserialize Binary Tree
3. Word Ladder
4. Merge k Sorted Lists
5. Longest Valid Parentheses

---

## Learning Path

1. **Week 1-2**: Arrays, Strings, Basic Sorting
2. **Week 3-4**: Linked Lists, Stacks, Queues
3. **Week 5-6**: Trees, Binary Search Trees
4. **Week 7-8**: Graphs, DFS, BFS
5. **Week 9-10**: Hash Tables, Advanced Sorting
6. **Week 11-12**: Dynamic Programming
7. **Week 13-14**: Greedy Algorithms, Advanced Topics

---

## Tips for Learning

1. **Practice Daily**: Code at least one problem per day
2. **Understand First**: Don't memorize, understand the logic
3. **Draw Diagrams**: Visualize data structures
4. **Trace Code**: Step through algorithms manually
5. **Start Simple**: Begin with easy problems
6. **Review Complexity**: Always analyze time/space complexity
7. **Compare Solutions**: Look at multiple approaches
8. **Build Projects**: Apply DSA in real projects

---

## Resources

- **Books**: "Introduction to Algorithms" (CLRS), "Cracking the Coding Interview"
- **Platforms**: LeetCode, HackerRank, Codeforces, GeeksforGeeks
- **Visualization**: VisuAlgo, Algorithm Visualizer
- **Practice**: Daily coding challenges, mock interviews

---

Good luck on your DSA journey! 🚀

