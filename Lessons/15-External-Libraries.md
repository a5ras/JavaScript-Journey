# Lesson 15: External Libraries 

This lesson introduces **External Libraries**. An external library is code that someone else wrote, which we can add to our project to gain new features and save time.

---

## 1. What is an External Library?

* An external library is a pre-written, reusable collection of JavaScript code.
* **Why use them?** They save us a lot of time and effort. Instead of re-inventing the wheel, we can use a library built by experts.
* **Example:** Working with dates (calculating, formatting) is surprisingly complicated. Instead of writing all that code ourselves, we can use a date library.

---

## 2. Example 1: `day.js` (A Date Library)

**day.js** is a popular, small, and fast library for parsing, validating, manipulating, and displaying dates and times.

### How to Add an External Library (The "Old Way")

The easiest way to add a library is to link to it from a **CDN (Content Delivery Network)** using a **<script>** tag. A CDN is a server that hosts the library file for free.

1.  **Find the Library:** Search for "day.js cdn".
2.  **Get the URL:** Find a link that ends in **.js**. For example:
    *https://unpkg.com/dayjs@1.11.10/dayjs.min.js*
3.  **Link in HTML:** Add a **<script>** tag with a **src** attribute in your HTML file's **<head>**.

        <head>
          <title>My Project</title>
          <script src="https://unpkg.com/dayjs@1.11.10/dayjs.min.js"></script>
        </head>
        <body>
          ...
          <script src="scripts/main.js"></script>
        </body>

### How to Use `day.js`

Now that the library is loaded, our **main.js** file (and any script loaded *after* it) has access to a new function: **dayjs()**.

1.  **Get Current Date:** Calling **dayjs()** creates a **day.js** object for the current date and time.

        const today = dayjs();
        console.log(today); // Logs the day.js object

2.  **Format Dates:** Use the **.format()** method to display the date nicely.

        // 'MMMM D, YYYY' is a format string
        console.log(today.format('MMMM D, YYYY'));
        // Output: 'November 8, 2025' (or your current date)

3.  **Manipulate Dates:** Use methods like **.add()** and **.subtract()**.

        // Add 7 days to today
        const futureDate = today.add(7, 'days');
        console.log(futureDate.format('MMMM D')); // Output: 'November 15'
        
        // Subtract 1 month
        const pastDate = today.subtract(1, 'month');
        console.log(pastDate.format('dddd, MMMM D')); // Output: 'Wednesday, October 8'

    * The second argument (**'days'**, **'month'**, **'year'**) specifies the unit.

---

## 3. How to Use Libraries with Modules (The "Modern Way")

Using **<script>** tags in the HTML is the old way. The modern way is to use **import** (which we learned in Lesson 14).

* You must find the **Module** or **ESM** version of the library.
* You **import** it directly into your **.js** file.
* You **do not** need to add a **<script>** tag to the HTML.

**Example 2: `lodash` (A Utility Library)**

**lodash** is a very popular library full of useful helper functions.

1.  **Get the Module URL:** We would find the ESM version's URL (e.g., *https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.min.js*).
2.  **Import in JavaScript:** In our **.js** file, we import it.

        // We import the entire library and give it a name, 
        // usually '_' (underscore), which is the standard for lodash.
        import _ from 'https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.min.js';
        
        // Now we can use lodash functions
        console.log(_.isString('hello')); // Output: true
        console.log(_.isString(5));       // Output: false
        console.log(_.isNumber(10));      // Output: true

* This is called a **default import**. We use it when the library exports itself as a single, default value. This is different from the **named import** (**import { products }...**) we used in Lesson 14.

---

## 4. Applying Libraries to the Amazon Project (Checkout Page)

We will now build the *checkout page* and use **day.js** to handle the delivery dates.

### Step 1: Create the Checkout Page Files

1.  **`checkout.html` (New File):** Create a new HTML file for the checkout page.
2.  **`scripts/checkout.js` (New File):** Create a new JavaScript file for the checkout page's logic.
3.  **`styles/checkout.css` (New File):** Create a new CSS file for the checkout page's styling.

**`checkout.html` (Setup):**

    <!DOCTYPE html>
    <html>
      <head>
        <title>Checkout</title>
        <link rel="stylesheet" href="styles/checkout.css">
      </head>
      <body>
        <div class="checkout-header">...</div>
    
        <div class="main">
          <div class="page-title">Review your order</div>
          
          <div class="checkout-grid js-order-summary">
            </div>
        </div>
        
        <script type="module" src="scripts/checkout.js"></script>
      </body>
    </html>

### Step 2: Create a Delivery Options Module

We need data for our delivery options. We'll create a new module for this.

**`data/delivery-options.js` (New File):**

    // This file exports an array of delivery options
    export const deliveryOptions = [{
      id: '1',
      deliveryDays: 7,
      priceCents: 0
    }, {
      id: '2',
      deliveryDays: 3,
      priceCents: 499
    }, {
      id: '3',
      deliveryDays: 1,
      priceCents: 999
    }];

### Step 3: Create a `getProduct` Helper Function

In our **main.js**, we looped through products to generate HTML. In **checkout.js**, we need to loop through the *cart* and find the matching product for each cart item. This logic of "finding a product by its ID" will be used many times.

Let's create a reusable function for it in our **products.js** file.

**`data/products.js` (Add this new function):**

    export const products = [ ... ]; // (Your existing array)
    
    // New helper function
    export function getProduct(productId) {
      let matchingProduct;
    
      products.forEach((product) => {
        if (product.id === productId) {
          matchingProduct = product;
        }
      });
    
      return matchingProduct;
    }

### Step 4: Write the Checkout JavaScript (`scripts/checkout.js`)

This file will import all the modules we need (**cart**, **products**, **day.js**, **delivery-options**) and build the page.

**`scripts/checkout.js` (Full Code):**

    // Import all the modules we need
    import { cart } from '../data/cart.js';
    import { products, getProduct } from '../data/products.js';
    import { deliveryOptions } from '../data/delivery-options.js';
    import dayjs from 'https://unpkg.com/dayjs@1.11.10/dayjs.min.js'; // Import day.js
    
    // This is the "Model"
    let cartSummaryHTML = ''; // Accumulator variable
    
    // Loop through the cart
    cart.forEach((cartItem) => {
      const productId = cartItem.productId;
    
      // Find the full product info using the helper function
      const matchingProduct = getProduct(productId);
    
      // Find the selected delivery option
      const deliveryOptionId = cartItem.deliveryOptionId;
      let deliveryOption;
      deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
          deliveryOption = option;
        }
      });
    
      // Calculate the delivery date
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      );
      const dateString = deliveryDate.format('dddd, MMMM D');
    
      // Generate the HTML for this cart item
      cartSummaryHTML += `
        <div class="cart-item-container">
          <div class="delivery-date">
            Delivery date: ${dateString}
          </div>
    
          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matchingProduct.image}">
    
            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">
                $${(matchingProduct.priceCents / 100).toFixed(2)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span class="delete-quantity-link link-primary">
                  Delete
                </span>
              </div>
            </div>
    
            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
          </div>
        </div>
      `;
    });
    
    // This function generates the 3 radio buttons for delivery
    function deliveryOptionsHTML(matchingProduct, cartItem) {
      let html = '';
    
      deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(
          deliveryOption.deliveryDays,
          'days'
        );
        const dateString = deliveryDate.format('dddd, MMMM D');
    
        const priceCents = deliveryOption.priceCents;
        const priceString = priceCents === 0 
          ? 'FREE' 
          : `$${(priceCents / 100).toFixed(2)}`;
        
        // Check if this option is the one selected in the cart
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    
        html += `
          <div class="delivery-option">
            <input type="radio"
              ${isChecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} - Shipping
              </div>
            </div>
          </div>
        `
      });
    
      return html;
    }
    
    // This is the "View"
    // Put the generated HTML on the page
    document.querySelector('.js-order-summary')
      .innerHTML = cartSummaryHTML;

-----

## Lesson 15 Exercises

  * **15a.** Go to **day.js** documentation. Figure out how to format a date like: **Friday, September 15**.
  * **15b.** Add 7 days to the current date and format it.
  * **15c.** Subtract 1 month from the current date and format it.
  * **15d.** Get the current day of the week (e.g., 'Saturday').
  * **15e.** Create **checkout.html** and link **checkout.js** (as a module).
  * **15f.** In **checkout.js**, **import {cart} from '../data/cart.js';**.
  * **15g.** Create **cartSummaryHTML = ''**. Loop through the cart and log the cart.
  * **15h.** In **data/products.js**, export **getProduct(productId)**.
  * **15i.** In **checkout.js**, **import {products, getProduct} from ...**.
  * **15j.** Use **getProduct()** to find the product for each item in the cart.
  * **15k.** Generate the HTML for the order summary.
  * **15l.** Display the HTML on the page.
  * **15m.** Create **data/delivery-options.js** and **export** the delivery options array.
  * **15n.** In **checkout.js**, **import** the **deliveryOptions**.
  * **15o.** Create a function **deliveryOptionsHTML()** that generates HTML for the delivery options.
  * **15p.** Calculate the delivery date (using **day.js**) and price for each option.
  * **15q.** In **data/cart.js**, add a **deliveryOptionId** to each cart item.
  * **15r.** Use the **deliveryOptionId** to add the **checked** attribute to the correct delivery option.

-----

## Challenge Exercises

  * **15s.** In **checkout.js**, add event listeners to the 'Delete' links to remove an item from the cart.
  * **15t.** (Hard) After deleting, update the page (Hint: re-run the code that generates the HTML).
  * **15u.** In **data/cart.js**, create a function **removeFromCart(productId)**.
  * **15v.** (Hard) In **checkout.js**, add event listeners to the radio buttons. When clicked, update the **deliveryOptionId** in the cart.
  * **15w.** (Hard) After updating the **deliveryOptionId**, update the page.
  * **15x.** (Hard) In **data/cart.js**, create a function **updateDeliveryOption(productId, deliveryOptionId)**.
