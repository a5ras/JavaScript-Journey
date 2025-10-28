# Lesson 04: HTML CSS Review, console.log

This lesson reviews the basics of HTML and CSS needed for JavaScript development and introduces the `console.log()` command. It also covers setting up a code editor.

---

## Code Editor Setup: VSCode

To write HTML, CSS, and JavaScript files efficiently, we use a **code editor**. The most popular one for web development is **Visual Studio Code (VSCode)**.

* **Installation:** Search for "VSCode" online, download, and install it following the instructions.
* **Opening a Folder:** Use **File -> Open Folder...** to open your `**avaScript-Course** project folder in VS Code. This allows you to see all your project files.
* **Creating Files:** Use the "New File" icon in the VS Code explorer panel to create files like `website.html`.

---

## HTML (HyperText Markup Language) Review

HTML provides instructions to the computer (specifically, the browser) on what **content** to display on a webpage.

* **HTML Files:** HTML code is written in files ending with `.html`.
* **Running HTML:** Open the `.html` file in a web browser (like Chrome) to see the result.
* **Elements:** HTML uses **elements** to structure content (e.g., buttons, paragraphs).
* **Tags:** Elements are created using **tags**. Most elements have an **opening tag** (e.g., `<button>`) and a **closing tag** (e.g., `</button>`).
    ```html
    <button>Hello</button>
    <p>Paragraph of text</p>
    ```
* **Nesting:** Elements can be placed inside other elements (e.g., a button inside a paragraph).
    ```html
    <p>
      Paragraph with a <button>Button inside</button>.
    </p>
    ```
* **Whitespace:** Multiple spaces and new lines in HTML code are usually collapsed into a **single space** by the browser. This allows for flexible code formatting (indentation) without affecting the visual output.

---

## CSS (Cascading Style Sheets) Review

CSS provides instructions on how to **style** the HTML content (appearance, layout, colors).

* **`<style>` Element:** CSS code can be placed inside a `<style>` element within the `<head>` section of an HTML file.
    ```html
    <head>
      <style>
        /* CSS code goes here */
      </style>
    </head>
    ```
* **CSS Rules:** CSS consists of rules that select elements and apply styles.
    ```css
    /* Selects all <button> elements */
    button {
      background-color: red; /* Property: value */
      color: white;
      border: none; /* Removes the default border */
    }
    ```
* **Syntax:**
    * **Selector:** Specifies which element(s) to style (e.g., `button`).
    * **Declaration Block:** Curly braces `{}` containing style declarations.
    * **Declaration:** A **property** (what to change, e.g., `background-color`) and a **value** (what to change it to, e.g., `red`), separated by a colon `:`, ending with a semicolon `;`.

---

## HTML Attributes

**Attributes** provide additional information or modify the behavior of an HTML element. They are always added to the **opening tag**.

* **Syntax:** `attributeName="value"` (Note: no spaces around `=`).
    ```html
    <button title="Tooltip message">Hover over me</button>
    ```
* **`title` Attribute:** Adds a tooltip that appears when hovering over the element.
* **`class` Attribute:** Assigns one or more **class names** (labels) to an element. This is crucial for selecting specific elements with CSS or JavaScript.
    ```html
    <button class="red-button">Red</button>
    <button class="yellow-button">Yellow</button>
    ```
    * **CSS Class Selector:** In CSS, select elements by class using a dot (`.`) followed by the class name.
        ```css
        .red-button {
          background-color: red;
        }
        .yellow-button {
          background-color: yellow;
        }
        ```

---

## Basic HTML Structure

It's best practice to structure HTML files consistently:

```html
<!DOCTYPE html> <html>
  <head>
    <title>Page Title</title> <style>
      /* CSS styles */
    </style>
  </head>
  <body>
    <button>Click</button>
    <p>Paragraph</p>

    <script>
      // JavaScript code
    </script>
  </body>
</html>
````

  * **`<!DOCTYPE html>`:** Essential declaration for modern HTML.
  * **`<html>`:** Root element, contains everything else.
  * **`<head>`:** Contains non-visible information (metadata, title, styles, links to CSS files).
  * **`<body>`:** Contains all the visible content of the page (buttons, text, images, etc.). JavaScript is usually placed at the **end** of the body.

-----

## Live Server Extension (VS Code)

  * **Purpose:** Automatically refreshes the browser page whenever you save changes to your HTML, CSS, or JS files. This speeds up development.
  * **Installation:** Go to the Extensions view in VS Code, search for "Live Server", and install it.
  * **Usage:** Right-click your HTML file in the VS Code explorer and choose "Open with Live Server".

-----

## Adding JavaScript to a Webpage

There are two primary ways to include JavaScript in an HTML file:

1.  **`<script>` Element:** Place JavaScript code directly inside `<script>` tags. It's standard practice to put the `<script>` tag just before the closing `</body>` tag. This ensures the HTML content exists before the JavaScript tries to interact with it.

    ```html
    <body>
      <script>
        alert('Hello from script tag!');
      </script>
    </body>
    ```

    The code inside the `<script>` tag runs when the browser loads the page.

2.  **`onclick` Attribute (and other event attributes):** Add JavaScript code directly to an HTML element's attribute (like `onclick`). This code runs only when the specific event occurs (e.g., the button is clicked).

    ```html
    <button onclick="alert('Button clicked!');">Click Me</button>
    ```

-----

## Comments

Comments are notes in the code ignored by the computer, used for explanation or temporarily disabling code.

  * **HTML Comments:** *<!---->*
  * **CSS Comments:** */* Comment text */*
  * **JavaScript Comments:**
      * Single-line: *// Comment text*
      * Multi-line: */* Comment text spanning multiple lines */*

-----

## console.log()

When running JavaScript *from an HTML file* (not directly in the console), results of calculations or expressions are **not automatically displayed**.

  * **Problem:**
    ```javascript
    // Inside a <script> tag:
    2 + 2; // Calculation happens, but result (4) is not shown anywhere
    ```
  * **Solution: `console.log()`** is a command that **displays values in the browser console**.
    ```javascript
    // Inside a <script> tag:
    console.log(2 + 2); // Displays '4' in the console

    console.log('some' + 'text'); // Displays 'sometext' in the console
    ```

Use `console.log()` frequently to check values and understand what your code is doing (debugging).

-----

## Lesson 4 Exercises

  * **4a.** Create an HTML file with the basic structure (`<!DOCTYPE>`, `<html>`, `<head>`, `<body>`). Add a `<title>`.
  * **4b.** Add a `<button>` inside the `<body>`.
  * **4c.** Add a `<p>` (paragraph) element below the button.
  * **4d.** Add some text inside the paragraph.
  * **4e.** Add a second paragraph below the first one.
  * **4f.** Inside the `<head>`, add a `<style>` element.
  * **4g.** In the CSS, make the `<button>` background yellow.
  * **4h.** In the CSS, make the `<button>` text color black.
  * **4i.** Add a `class="js-button"` to the `<button>`.
  * **4j.** Change the CSS selector from `button` to `.js-button`. Verify the style still applies.
  * **4k.** Add a `<script>` tag at the end of the `<body>`. Inside, use `alert('hello');`. Save and check the popup.
  * **4l.** Comment out the `alert('hello');` line.
  * **4m.** Use `console.log('hello');` inside the script. Open the console and check the message.
  * **4n.** Calculate `2 + 2` inside `console.log()`.
  * **4o.** Calculate `10 - 3 * 2` inside `console.log()`. Check the result (order of operations).
  * **4p.** Add an `onclick` attribute to the button. Make it run `console.log('Button clicked!');`. Click the button and check the console.
  * **4q.** Add a second button "Add to cart". Add `onclick="console.log('Added!');"`.
  * **4r.** Add a third button "Buy now". Add `onclick="console.log('Bought!');"`.

-----

## Challenge Exercises

  * **4s.** Create an `index.html` file. Add the basic structure. Set the title to "Challenge Exercises".
  * **4t.** Add the text "Amazon" inside the body.
  * **4u.** Make the "Amazon" text a link that goes to `amazon.com`. Set it to open in a new tab (Hint: research the `<a>` tag and its `href` and `target` attributes).
  * **4v.** Add the text "Back to Google" below the Amazon link. Make it a link to `google.com`.
  * **4w.** Add the text "Nike Black Running Shoes".
  * **4x.** Below the Nike text, add the price "$109 - in stock.".
  * **4y.** Below the price, add an "Add to Cart" button.
  * **4z.** Below that, add a "Buy now" button.

*(Exercise details adapted from video and common practice)*
