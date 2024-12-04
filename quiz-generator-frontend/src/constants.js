// src/constants.js
export const LANGUAGE_VERSIONS = {
  javascript: "20.17.0",
  python: "3.11.4",
  java: "15.0.2",
  rust: "1.71.0",
  cpp: "10.2.0",
};

export const CODE_SNIPPETS = {
  javascript: {
    1: "function sum(a, b) {\n    // Write your code here\n}",
    2: "function isEven(num) {\n    // Write your code here\n}",
    3: "function factorial(n) {\n    // Write your code here\n}",
    4: "function reverseString(str) {\n    // Write your code here\n}",
    5: "function findMax(arr) {\n    // Write your code here\n}",
  },
  python: {
    1: "def sum(a, b):\n    # Write your code here",
    2: "def is_even(num):\n    # Write your code here",
    3: "def factorial(n):\n    # Write your code here",
    4: "def reverse_string(s):\n    # Write your code here",
    5: "def find_max(arr):\n    # Write your code here",
  },
  java: {
    1: "public int sum(int a, int b) {\n    // Write your code here\n}",
    2: "public boolean isEven(int num) {\n    // Write your code here\n}",
    3: "public int factorial(int n) {\n    // Write your code here\n}",
    4: "public String reverseString(String str) {\n    // Write your code here\n}",
    5: "public int findMax(int[] arr) {\n    // Write your code here\n}",
  },
  rust: {
    1: "fn sum(a: i32, b: i32) -> i32 {\n    // Write your code here\n}",
    2: "fn is_even(num: i32) -> bool {\n    // Write your code here\n}",
    3: "fn factorial(n: u32) -> u32 {\n    // Write your code here\n}",
    4: "fn reverse_string(s: &str) -> String {\n    // Write your code here\n}",
    5: "fn find_max(arr: &Vec<i32>) -> i32 {\n    // Write your code here\n}",
  },
  cpp: {
    1: "int sum(int a, int b) {\n    // Write your code here\n}",
    2: "bool isEven(int num) {\n    // Write your code here\n}",
    3: "int factorial(int n) {\n    // Write your code here\n}",
    4: "std::string reverseString(const std::string &str) {\n    // Write your code here\n}",
    5: "int findMax(int arr[], int size) {\n    // Write your code here\n}",
  },
};

// Unified QUESTIONS object for multiple languages
export const QUESTIONS = {
  javascript: [
    {
      id: 1,
      question: "Write a function that returns the sum of two numbers.",
      solution: "function sum(a, b) {\n  return a + b;\n}",
    },
    {
      id: 2,
      question: "Write a function that checks if a number is even.",
      solution: "function isEven(num) {\n  return num % 2 === 0;\n}",
    },
    {
      id: 3,
      question: "Write a function that calculates the factorial of a number.",
      solution: [
        "function factorial(n) {\n  return n === 0 ? 1 : n * factorial(n - 1);\n}",
        "function factorial(n) {\n  if (n === 0) return 1;\n  return n * factorial(n - 1);\n}",
        "function factorial(n) {\n  if (n > 0) return n * factorial(n - 1);\n  return 1;\n}",
      ],
    },
    {
      id: 4,
      question: "Write a function that reverses a string.",
      solution:
        "function reverseString(str) {\n  return str.split('').reverse().join('');\n}",
    },
    {
      id: 5,
      question: "Write a function that finds the maximum number in an array.",
      solution: "function findMax(arr) {\n  return Math.max(...arr);\n}",
    },
  ],
  python: [
    {
      id: 1,
      question: "Write a function that returns the sum of two numbers.",
      solution: "def sum(a, b):\n    return a + b",
    },
    {
      id: 2,
      question: "Write a function that checks if a number is even.",
      solution: "def is_even(num):\n    return num % 2 == 0",
    },
    {
      id: 3,
      question: "Write a function that calculates the factorial of a number.",
      solution: [
        "def factorial(n):\n    return n * factorial(n - 1) if n > 0 else 1",
        "def factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)",
        "def factorial(n):\n    if n > 0:\n        return n * factorial(n - 1)\n    return 1",
      ],
    },
    {
      id: 4,
      question: "Write a function that reverses a string.",
      solution: "def reverse_string(s):\n    return s[::-1]",
    },
    {
      id: 5,
      question: "Write a function that finds the maximum number in a list.",
      solution: "def find_max(arr):\n    return max(arr)",
    },
  ],
  java: [
    {
      id: 1,
      question: "Write a function that returns the sum of two numbers.",
      solution: "public int sum(int a, int b) {\n  return a + b;\n}",
    },
    {
      id: 2,
      question: "Write a function that checks if a number is even.",
      solution: "public boolean isEven(int num) {\n  return num % 2 == 0;\n}",
    },
    {
      id: 3,
      question: "Write a function that calculates the factorial of a number.",
      solution: [
        "public int factorial(int n) {\n  return n == 0 ? 1 : n * factorial(n - 1);\n}",
        "public int factorial(int n) {\n  if (n == 0) return 1;\n  return n * factorial(n - 1);\n}",
        "public int factorial(int n) {\n  if (n > 0) return n * factorial(n - 1);\n  return 1;\n}",
      ],
    },
    {
      id: 4,
      question: "Write a function that reverses a string.",
      solution:
        "public String reverseString(String str) {\n  return new StringBuilder(str).reverse().toString();\n}",
    },
    {
      id: 5,
      question: "Write a function that finds the maximum number in an array.",
      solution:
        "public int findMax(int[] arr) {\n  int max = arr[0];\n  for (int num : arr) {\n    if (num > max) max = num;\n  }\n  return max;\n}",
    },
  ],
  rust: [
    {
      id: 1,
      question: "Write a function that returns the sum of two numbers.",
      solution: "fn sum(a: i32, b: i32) -> i32 {\n    a + b\n}",
    },
    {
      id: 2,
      question: "Write a function that checks if a number is even.",
      solution: "fn is_even(num: i32) -> bool {\n    num % 2 == 0\n}",
    },
    {
      id: 3,
      question: "Write a function that calculates the factorial of a number.",
      solution: [
        "fn factorial(n: u32) -> u32 {\n    if n == 0 { 1 } else { n * factorial(n - 1) }\n}",
        "fn factorial(n: u32) -> u32 {\n    match n {\n        0 => 1,\n        _ => n * factorial(n - 1),\n    }\n}",
      ],
    },
    {
      id: 4,
      question: "Write a function that reverses a string.",
      solution:
        "fn reverse_string(s: &str) -> String {\n    s.chars().rev().collect()\n}",
    },
    {
      id: 5,
      question: "Write a function that finds the maximum number in a vector.",
      solution:
        "fn find_max(arr: &Vec<i32>) -> i32 {\n    *arr.iter().max().unwrap()\n}",
    },
  ],
  cpp: [
    {
      id: 1,
      question: "Write a function that returns the sum of two numbers.",
      solution: "int sum(int a, int b) {\n    return a + b;\n}",
    },
    {
      id: 2,
      question: "Write a function that checks if a number is even.",
      solution: "bool isEven(int num) {\n    return num % 2 == 0;\n}",
    },
    {
      id: 3,
      question: "Write a function that calculates the factorial of a number.",
      solution: [
        "int factorial(int n) {\n    return n == 0 ? 1 : n * factorial(n - 1);\n}",
        "int factorial(int n) {\n    if (n == 0) return 1;\n    return n * factorial(n - 1);\n}",
      ],
    },
    {
      id: 4,
      question: "Write a function that reverses a string.",
      solution:
        "std::string reverseString(const std::string &str) {\n    return std::string(str.rbegin(), str.rend());\n}",
    },
    {
      id: 5,
      question: "Write a function that finds the maximum number in an array.",
      solution:
        "int findMax(int arr[], int size) {\n    int max = arr[0];\n    for (int i = 1; i < size; i++) {\n        if (arr[i] > max) {\n            max = arr[i];\n        }\n    }\n    return max;\n}",
    },
  ],
};
