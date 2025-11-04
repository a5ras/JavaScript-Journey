# Lesson 11: Arrays and Loops

This lesson introduces two very important concepts: **Arrays** (for storing lists of values) and **Loops** (for repeating code). We will use these to build a To-Do List project.

---

## 1. Arrays

An **Array** is a type of value in JavaScript that lets us store a list of values.

### Creating an Array

We create an array using **square brackets `[]`**.

```javascript
// An empty array
[];

// An array of numbers
[10, 20, 30];

// An array of strings
['hello', 'world'];
````

We can save an array in a variable:

```javascript
const myArray = [10, 20, 30];
console.log(myArray); // Displays [10, 20, 30]
```

### Accessing Values in an Array (Using Index)

We get values out of an array using their **position**, which is called an **index**.
**Important:** Array indexes **start at 0**, not 1.

```javascript
const myArray = [10, 20, 30];

// Get the value at index 0 (the first item)
console.log(myArray[0]); // Output: 10

// Get the value at index 1 (the second item)
console.log(myArray[1]); // Output: 20
```

### Updating Values in an Array

You can change a value in an array by accessing its index and assigning a new value. This works even if the array is a **const**. (Remember, **const** for an object or array means the *reference* can't change, but the contents *inside* can).

```javascript
const myArray = [10, 20, 30];
myArray[0] = 99; // Change the value at index 0
console.log(myArray); // Output: [99, 20, 30]
```

### Array Properties and Methods

Arrays are objects, which means they have built-in properties and methods.

#### **.length** (Property)

The **.length** property tells you how many items are in the array.

```javascript
const myArray = [10, 20, 30];
console.log(myArray.length); // Output: 3
```

#### **.push()** (Method)

The **.push()** method adds one or more values to the **end** of the array.

```javascript
const myArray = [10, 20, 30];
myArray.push(100);
console.log(myArray); // Output: [10, 20, 30, 100]
```

#### **.splice()** (Method)

The **.splice()** method removes items from an array. It **changes the original array**.

It takes two arguments:

1.  **index:** *Where* to start removing from.
2.  **numberToDelete:** *How many* items to remove.

<!-- end list -->

```javascript
const myArray = [10, 20, 30, 100];
myArray.splice(0, 1); // Start at index 0, remove 1 item
console.log(myArray); // Output: [20, 30, 100]

myArray.splice(1, 2); // Start at index 1, remove 2 items
console.log(myArray); // Output: [20]
```

### Other Array Details

  * **Mixed Arrays:** Arrays can hold any type of value, all mixed together (numbers, strings, booleans, even other objects and arrays).
    ```javascript
    [1, 'hello', true, { name: 'socks' }, [1, 2]]
    ```
  * **Checking Type:** **typeof** is quirky with arrays:
    ```javascript
    console.log(typeof [1, 2]); // Output: 'object'
    ```
    To *correctly* check if a value is an array, use **Array.isArray()**:
    ```javascript
    console.log(Array.isArray([1, 2])); // Output: true
    console.log(Array.isArray({ name: 'socks' })); // Output: false
    ```

-----

## 2\. Loops

Loops let us repeat code over and over again.

### While Loops

A **while** loop runs as long as a condition is **true**.

```javascript
// Example: Count from 1 to 5
let i = 1; // 1. Loop variable (Initialization)

while (i <= 5) { // 2. Loop condition
  console.log(i);
  i = i + 1; // 3. Increment step (CRITICAL!)
}
// Output: 1, 2, 3, 4, 5
```

  * **Iteration:** Each time a loop runs is called an iteration.
  * **Infinite Loop:** If you forget the increment step (**i = i + 1**), the condition **i \<= 5** will *always* be true, and the loop will run forever, crashing your browser\!

### For Loops

A **for** loop is a more compact and common way to write a loop. It combines the 3 steps (initialization, condition, increment) into one line.

```javascript
// Syntax: for ( [1. variable]; [2. condition]; [3. increment] ) { ... }
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
// Output: 1, 2, 3, 4, 5
```

  * **For Loops vs. While Loops:**
      * Use a **for loop** for standard loops (e.g., counting, looping through an array).
      * Use a **while loop** for non-standard loops (e.g., looping until a random number is \> 0.5).

-----

## 3\. Looping Through an Array

The most common use of a **for** loop is to iterate through an array, one item at a time.

```javascript
const todoList = [
  'make dinner',
  'wash dishes',
  'watch youtube'
];

// We loop from index 0 up to (but not including) the length
for (let i = 0; i < todoList.length; i++) {
  const value = todoList[i]; // Get the value at the current index 'i'
  console.log(value);
}
// Output:
// make dinner
// wash dishes
// watch youtube
```

-----

## 4\. Accumulator Pattern

The **Accumulator Pattern** is a powerful technique where you:

1.  Create a "result" variable (the accumulator).
2.  Loop through an array.
3.  Update the result variable in each iteration.

### Example 1: Summing an Array

```javascript
const nums = [1, 1, 3];
let total = 0; // 1. Accumulator variable

for (let i = 0; i < nums.length; i++) {
  const num = nums[i];
  total = total + num; // 2. Update the accumulator
}

console.log(total); // Output: 5
```

### Example 2: Creating a New Array (Doubling Numbers)

```javascript
const nums = [1, 1, 3];
const numsDoubled = []; // 1. Accumulator variable

for (let i = 0; i < nums.length; i++) {
  const num = nums[i];
  numsDoubled.push(num * 2); // 2. Update the accumulator
}

console.log(numsDoubled); // Output: [2, 2, 6]
```

-----

## 5\. Project: To-Do List

We will now build the To-Do List project in three stages.

### Stage 1: Add to Array (Console)

First, we just add items to an array and log it to the console.

**`11-todo-list.html` (Full HTML File):**

```html
<!DOCTYPE html>
<html>
<head>
  <title>Todo List</title>
</head>
<body>
  <p>Todo List</p>
  <input placeholder="Todo name" class="js-name-input">
  <button onclick="
    addTodo();
  ">Add</button>

  <script src="scripts/11-todo-list.js"></script>
</body>
</html>
```

**`scripts/11-todo-list.js` (Full JS File):**

```javascript
// This array will store our todos.
// We can use 'const' because we are only changing the *inside*
// of the array (.push), not the array variable itself.
const todoList = [];

function addTodo() {
  // Get the input element
  const inputElement = document.querySelector('.js-name-input');
  
  // Get the text from the input box using .value
  const name = inputElement.value;
  
  // Add the text to our array
  todoList.push(name);
  console.log(todoList);
  
  // Clear the input box after adding
  inputElement.value = '';
}
```

### Stage 2: Display Array on the Page (Generating HTML)

Now, we will use the **Accumulator Pattern** to generate HTML from our array and display it on the page.

**`11-todo-list.html` (Updated HTML):**

```html
<!DOCTYPE html>
<html>
<head>
  <title>Todo List</title>
</head>
<body>
  <p>Todo List</p>
  <input placeholder="Todo name" class="js-name-input">
  <button onclick="
    addTodo();
  ">Add</button>

  <div class="js-todo-list"></div>

  <script src="scripts/11-todo-list.js"></script>
</body>
</html>
```

**`scripts/11-todo-list.js` (Updated JS):**

```javascript
const todoList = [];

// We create a new function to *display* the list.
// 'render' is a common name for "display on page".
function renderTodoList() {
  // Accumulator pattern
  let todoListHTML = ''; // 1. Accumulator variable (starts empty)

  // 2. Loop through the array
  for (let i = 0; i < todoList.length; i++) {
    const todo = todoList[i];
    // Generate an HTML string for this todo
    const html = `<p>${todo}</p>`;
    // Add it to our accumulator
    todoListHTML = todoListHTML + html;
  }

  // 3. Put the generated HTML on the page
  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;
}

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;
  
  todoList.push(name);
  
  inputElement.value = ''; // Clear the input

  // After adding a new todo, we re-render the entire list
  renderTodoList();
}
```

### Stage 3: Adding Due Dates and Delete Buttons (Final Version)

Our array needs to store *two* pieces of info (name and date). We **must** use an array of **objects**.

**`11-todo-list.html` (Final HTML - with CSS):**

  * We add a **\<input type="date"\>** element.
  * We add classes for styling with **CSS Grid**.

<!-- end list -->

```html
<!DOCTYPE html>
<html>
<head>
  <title>Todo List</title>
  <link rel="stylesheet" href="styles/11-todo-list.css">
</head>
<body>
  <p>Todo List</p>

  <div class="todo-input-grid">
    <input placeholder="Todo name" class="js-name-input name-input">
    <input type="date" class="js-due-date-input due-date-input">
    <button onclick="
      addTodo();
    " class="add-todo-button">Add</button>
  </div>

  <div class="js-todo-list todo-grid"></div>

  <script src="scripts/11-todo-list.js"></script>
</body>
</html>
```

**`styles/11-todo-list.css` (Full CSS File):**

```css
body {
  font-family: Arial;
}

.todo-grid,
.todo-input-grid {
  /* Aligns elements in a grid */
  display: grid;
  /* Defines the columns:
    1fr = 1 "fraction" (takes up available space)
    150px = fixed width
    100px = fixed width
  */
  grid-template-columns: 1fr 150px 100px;
  column-gap: 10px;
  row-gap: 10px;
  align-items: center; /* Vertically centers items in each row */
}

/* Make the input grid's columns different */
.todo-input-grid {
  grid-template-columns: 1fr 150px 100px;
  margin-bottom: 10px; /* Space below the inputs */
}

.name-input,
.due-date-input {
  font-size: 15px;
  padding: 6px;
}

.add-todo-button {
  background-color: green;
  color: white;
  border: none;
  font-size: 15px;
  cursor: pointer;
  padding: 8px 0px; /* 8px top/bottom, 0px left/right */
}

.delete-todo-button {
  background-color: darkred;
  color: white;
  border: none;
  font-size: 15px;
  cursor: pointer;
  padding: 8px 0px;
}
```

**`scripts/11-todo-list.js` (Final JS File):**

```javascript
// We now store an array of *objects*
const todoList = [{
  name: 'make dinner',
  dueDate: '2022-12-22'
}, {
  name: 'wash dishes',
  dueDate: '2022-12-22'
}];

// We must call this on load to display the default items
renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  for (let i = 0; i < todoList.length; i++) {
    // Get the object at the current index
    const todoObject = todoList[i];
    
    // Use destructuring to get properties from the object
    const { name, dueDate } = todoObject;
    
    // Generate HTML for *each* todo object
    // We use <div>s for the CSS Grid
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button onclick="
        // When clicked, splice this *exact* item using its index 'i'
        todoList.splice(${i}, 1);
        
        // Re-run the render function to update the page
        renderTodoList(); 
      " class="delete-todo-button">Delete</button>
    `;
    
    todoListHTML += html;
  }

  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;
}

function addTodo() {
  const nameInputElement = document.querySelector('.js-name-input');
  const name = nameInputElement.value;

  // Get the date input element and its value
  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;
  
  // Push a new *object* into the array
  todoList.push({
    name: name,
    dueDate: dueDate
    // We can use the Shorthand Property syntax:
    // name,
    // dueDate
  });
  
  // Clear the input boxes
  nameInputElement.value = '';
  dateInputElement.value = '';

  renderTodoList();
}
```

-----

## 6\. Loop Shortcuts: `break` and `continue`

  * **break;**: This keyword **immediately exits** a loop (stops it completely).
    ```javascript
    for (let i = 1; i <= 10; i++) {
      if (i === 5) {
        break; // Stops the loop when i is 5
      }
      console.log(i); // Output: 1, 2, 3, 4
    }
    ```
  * **continue;**: This keyword **skips the rest of the current iteration** and moves to the next one.
    ```javascript
    for (let i = 1; i <= 5; i++) {
      if (i === 3) {
        continue; // Skips this iteration when i is 3
      }
      console.log(i); // Output: 1, 2, 4, 5 (3 is skipped)
    }
    ```

-----

## ✏️ Lesson 11 Exercises

  * **11a.** You are given the array: **const nums = [10, 20, 30];**. Set the value at index 2 to 99.
  * **11b.** Create a function **getLastValue(array)** that takes an array and returns the last value.
  * **11c.** Create a function **arraySwap(array)** that swaps the first and last values of an array.
  * **11d.** Create a **for** loop that counts from 0 to 10 in steps of 2.
  * **11e.** Create a **for** loop that counts down from 5 to 0.
  * **11f.** Repeat 11d and 11e using a **while** loop.
  * **11g.** You are given an array of numbers. Create a new array where each number is increased by 1.
  * **11h.** Create a function **addOne(array)** that takes an array of numbers and returns an array where each number is increased by 1.
  * **11i.** Create a function **addNum(array, num)** that takes an array and a number, and returns an array where each number is increased by the **num**.
  * **11j.** Create a function **addArrays(array1, array2)** that adds two arrays together (e.g. **[1, 1, 2] + [1, 1, 3] = [2, 2, 5]**).
  * **11k.** Create a function **countPositive(nums)** that returns how many numbers in an array are \> 0.
  * **11l.** Create a function **minMax(nums)**. If the array is empty, return **{ min: null, max: null }**. If not empty, return **{ min: (min number), max: (max number) }**.
  * **11m.** Create a function **countWords(words)** that counts how many times each string appears in the array. Return an object (e.g. **['apple', 'grape', 'apple'] =\> { apple: 2, grape: 1 }**).

-----

## 🏆 Challenge Exercises

  * **11n.** In the to-do list, when you click 'Delete', the todo disappears immediately. Modify the code so it takes 1 second to disappear (Hint: use **setTimeout()** and **CSS transitions**).
  * **11o.** Make the "Add" button add the todo when you press "Enter" in *either* input field (Hint: check for **event.key === 'Enter'** in the **onkeydown** of both inputs).
  * **11p.** You are given an array of strings. Find the first 2 strings that are the same (e.g. **['a', 'b', 'c', 'a', 'c'] =\> 'a'**). (Hint: use **break**).
  * **11q.** Find the first string that appears 2 times in the array (e.g. **['a', 'b', 'c'] =\>** no result. **['a', 'b', 'c', 'a'] =\> 'a'**). (Hint: nested loops).
  * **11r.** (Hard) Find all strings that appear 2 times. (e.g. **['a', 'b', 'c', 'a', 'c'] =\> ['a', 'c']**).
