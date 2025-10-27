# Lesson 01: JavaScript Basics 

## ❓ What is JavaScript?

JavaScript (JS) is one of the three core technologies used to create websites, from simple pages to complex applications like YouTube or Amazon.

* **HTML:** Creates the **content** of a website (text, images, buttons).
* **CSS:** **Styles** the content (colors, fonts, layout).
* **JavaScript:** Makes the content **interactive** (clickable buttons, adding products to a cart, dynamic changes).

The main idea behind JavaScript is giving **instructions** to a computer, which it then follows. These instructions are called **code**, and when the computer follows them, it's called **running the code**. JavaScript is one specific **programming language** used to write these instructions.

---

## How to Practice: The Browser Console

We'll use a practice website and the browser's developer console to run our code.

1.  **Go to the website:** **supersimple.dev/js-basics/**
2.  **Open the Console:** Right-click on a blank area of the page, click **"Inspect"**, and then click the **"Console"** tab.

The console is where we can type JavaScript instructions and see the results immediately.

---

## Basic Commands

### alert()

This command creates a popup message on the screen. The text inside the single quotes is what appears in the popup.

```javascript
// Creates a popup that says "hello"
alert('hello');

// Creates a popup with different text
alert('good job');
````

### Math

We can perform math calculations directly in the console. JavaScript follows the standard order of operations.

```javascript
// The console will output 4
2 + 2;

// The console will output 7
10 - 3;
```

### document.body.innerHTML

This command lets us modify the HTML *inside* the ***<body>** tag of the website. We can change the entire visible content of the page.

```javascript
// This will erase the website and replace it with the word "hello"
document.body.innerHTML = 'hello';
```

**Important:** Modifying the webpage like this is a core feature of JavaScript.

-----

## Syntax: The Rules of the Language

Syntax refers to the rules we must follow when writing code, like grammar in English. Unlike English grammar, syntax rules in programming must be followed *exactly*, otherwise the computer won't understand and will give a **Syntax Error**.

  * Characters like brackets **()**, quotes **''**, and semicolons **;** all have special meanings.
  * JavaScript is **case-sensitive** (e.g., **innerHTML** with a capital 'H' is different from **innerhtml**).
  * We'll learn syntax rules gradually throughout the course.

-----

## Lesson 1 Exercises

(Do these exercises in the Console on **supersimple.dev/js-basics/**)

  * **1a.** Use **alert(...)** to display 'Good morning\!' in a popup.
  * **1b.** Display your name in a popup.
  * **1c.** Using math, calculate **10 + 5** in the Console.
  * **1d.** Calculate **20 - 5** in the Console.
  * **1e.** Calculate **2 + 2 - 5** in the Console.
  * **1f.** Use **document.body.innerHTML =** to display 'Good morning\!' on the web page.
  * **1g.** Display your name on the web page.

-----

## Challenge Exercises

  * **1h.** You order a T-shirt for $10, socks for $8, and dinner plates for $20. Use JavaScript to calculate the total cost.
  * **1i.** Your bank account has $100. You spend $20 on lunch, $50 on dinner, and earn $200 from your job. Calculate how much money you have.
  * **1j.** Use *document.body.innerHTML* to make the web page blank.
    
---
