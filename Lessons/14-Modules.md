# Lesson 14: Modules

This lesson introduces **JavaScript Modules** (also called **ES Modules**). This is the modern, professional way to organize JavaScript code by splitting it into multiple files.

-----

## 1\. The Problem: One Giant `.js` File

In Lesson 10, we separated our code into three files: **.html**, **.css**, and **.js**. This was a great improvement.

However, as our project (like the Amazon clone) gets bigger, our single **.js** file will become huge and unmanageable. We'll have code for the cart, code for the products, code for the checkout page, all in one place.

## 2\. The "Old Way" (Multiple Script Tags)

One way to split files is to just use multiple **\<script\>** tags in the HTML.

**Example: Building the Amazon Homepage (Old Way)**

First, let's create a file to hold our product data.

**data/products.js (New File):**

```
const products = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 1090
  },
  // ... (more product objects) ...
];
```

Now, we create our main script.

**scripts/main.js (New File):**

```
// This code loops through the 'products' array and generates HTML
let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>
      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>
      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>
      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>
      </div>
  `;
});

document.querySelector('.js-products-grid')
  .innerHTML = productsHTML;
```

**index.html (The "Old Way" of linking):**

```
<!DOCTYPE html>
<html>
  <head>...</head>
  <body>
    <div class="js-products-grid"></div>

    <script src="data/products.js"></script>
    <script src="scripts/main.js"></script>
  </body>
</html>
```

### Problems with the "Old Way":

1.  **Global Scope:** Both **products** (from **products.js**) and **productsHTML** (from **main.js**) are **global variables**. This is dangerous\! If we accidentally use the same variable name in another file, it will cause bugs.
2.  **File Order:** **main.js** *depends* on **products.js**. If we linked them in the wrong order in the HTML, the site would break. This is fragile.

-----

## 3\. The Solution: JavaScript Modules (ESM)

**Modules** are the modern solution.

  * **A module** is a **.js** file.
  * By default, variables inside a module are **private** (not global).
  * We can choose which code to share using **export**.
  * We can use shared code from other files using **import**.

### Step 1: Add `type="module"` to the HTML

To tell the browser we are using modules, we add **type="module"** to our *main* script tag in the HTML. We also *remove* the other script tags.

**index.html (The *New* Way):**

```
<!DOCTYPE html>
<html>
  <head>...</head>
  <body>
    <div class="js-products-grid"></div>

    <script type="module" src="scripts/main.js"></script>
  </body>
</html>
```

### Step 2: `export` (Share Code)

We go into the files that *have* the code we want to share and add the **export** keyword.

**data/products.js (Updated):**
We **export** the **products** array.

```
export const products = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    // ...
  },
  // ... (more product objects) ...
];
```

### Step 3: `import` (Use Code)

Now, in our main file, we **import** the code we need from other files.

**scripts/main.js (Updated):**
We **import** the **products** array from **products.js**.

```
// We *must* use a relative path.
// '../' means "go up one folder"
import { products } from '../data/products.js';

let productsHTML = '';

// The rest of the code works the same!
products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      </div>
  `;
});

document.querySelector('.js-products-grid')
  .innerHTML = productsHTML;
```

  * **import { products } ...**: The **{...}** are for **named exports**. This means we are importing a variable specifically named **products**.
  * **'../data/products.js'**: This is the file path.
      * **'./'** means "in the same folder".
      * **'../'** means "go up one folder" (from **scripts** to **amazon-project**) and then down into **data**.
      * We *must* include the **.js** file extension.

-----

## 4\. Refactoring the Cart with Modules

Let's apply this to our cart logic.

1.  **Create a Cart Module:** Create a new file for all cart-related code.

    **scripts/cart.js (New File):**

    ```
    // This 'cart' array is now private to this file.
    const cart = [];

    // We export *only* the function we want other files to use.
    export function addToCart(productId) {
      let matchingItem;

      cart.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        cart.push({
          productId: productId,
          quantity: 1
        });
      }
    }
    ```

2.  **Update `main.js` to Use the Cart Module:**
    We **import** the **addToCart** function and call it.

    **scripts/main.js (Updated):**

    ```
    import { products } from '../data/products.js';
    // Import from a file in the *same* folder (scripts/)
    import { addToCart } from './cart.js';

    let productsHTML = '';

    products.forEach((product) => {
      productsHTML += `
        <div class="product-container">
          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              </select>
          </div>
          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
      `;
    });

    document.querySelector('.js-products-grid')
      .innerHTML = productsHTML;

    // Add event listeners *after* generating the HTML
    document.querySelectorAll('.js-add-to-cart')
      .forEach((button) => {
        button.addEventListener('click', () => {
          // Get the product ID from the data- attribute
          const productId = button.dataset.productId;
          
          // Call the imported function!
          addToCart(productId);
          
          // Calculate and display cart quantity
          let cartQuantity = 0;
          cart.forEach((item) => {
            cartQuantity += item.quantity;
          });
          document.querySelector('.js-cart-quantity')
            .innerHTML = cartQuantity;
        });
      });
    ```

      * **Data Attributes (data-product-id="...")**: This is the modern way to attach data (like a product ID) to an HTML element.
      * **button.dataset.productId**: This is how JavaScript reads the value from **data-product-id**.

-----

## ✏️ Lesson 14 Exercises

  * **14a.** What is the problem with using multiple **\<script\>** tags?
  * **14b.** How do we fix this problem?
  * **14c.** What is **type="module"**?
  * **14d.** What is **export**?
  * **14e.** What is **import**?
  * **14f.** Create **scripts/cart.js**. Create a **cart** array and an **addToCart()** function. **Export** the function.
  * **14g.** In **main.js**, **import** the **addToCart()** function.
  * **14h.** In the Add to Cart **addEventListener**, call the **addToCart()** function.
  * **14i.** Update the cart quantity in the **addToCart()** function.
  * **14j.** Display the cart quantity on the page.
  * **14k.** Use a **data-** attribute to add the product ID to the "Add to Cart" button.
  * **14l.** In the **addEventListener**, get the product ID from the **data-** attribute.
  * **14m.** Pass the product ID to **addToCart()**.
  * **14n.** In **addToCart()**, check if the product is already in the cart and increase the quantity.
  * **14o.** Add an "Added to cart" message.
