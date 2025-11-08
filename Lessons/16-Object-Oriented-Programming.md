# Lesson 16: Object-Oriented Programming (OOP) 

This lesson introduces **Object-Oriented Programming (OOP)**, a very powerful and popular style of programming that helps us write more organized, reusable, and less buggy code.

---

## 1. What is Object-Oriented Programming (OOP)?

**OOP** is a way of organizing our code by grouping data and the functions that use that data into a single "object".

* **The Problem (Procedural Code):**
    So far, our code has been "procedural". Our data (like the **cart** array) is in one file, but the functions that use it are *everywhere* (**addToCart()**, **removeFromCart()**, **updateDeliveryOption()**, logic in **main.js**, logic in **checkout.js**).
    This is messy. If we want to change how the cart works, we have to hunt through many different files.

* **The Solution (OOP):**
    With OOP, we create a **Cart Object**. This single object will hold *both* the data (the array of items) *and* the functions (**addToCart**, **removeFromCart**) inside itself.
    
    Instead of calling:
    *addToCart(cart, product);*
    
    We will call:
    *cart.addToCart(product);*
    
    This is much cleaner and keeps all related code in one place.

---

## 2. Classes

A **Class** is a "blueprint" or a "factory" for creating objects.
An **Instance** is an object created *from* that blueprint.

### How to Create a Class
We use the **class** keyword.

    // A class name is usually capitalized
    class Product {
      // 1. constructor()
      // This is a special method that runs *once*
      // when we create a new instance of the class.
      // It's used to set up the object.
      constructor(inputName, inputPrice) {
        // 'this' refers to the object we are creating
        this.name = inputName;
        this.price = inputPrice;
      }
    
      // 2. Methods
      // These are functions attached to the object.
      // We don't need the 'function' keyword.
      display() {
        console.log(`Product: ${this.name}, Price: $${this.price}`);
      }
    }

### How to Create an Instance
We use the **new** keyword. This runs the **constructor()**.

    // Create an instance of the Product class
    const product1 = new Product('Baseball', 10);
    
    // 'product1' is now an object: { name: 'Baseball', price: 10 }
    console.log(product1);
    
    // We can call the method on the instance
    product1.display(); // Output: Product: Baseball, Price: $10
    
    // We can create another, separate instance
    const product2 = new Product('Shirt', 20);
    product2.display(); // Output: Product: Shirt, Price: $20

---

## 3. Inheritance

**Inheritance** is a feature of OOP that lets us create a new class (a "child class") that gets all the features (properties and methods) from an existing class (a "parent class").

This is great for code reusability.

* A **Clothing** item *is a* **Product**, but it also has a **size**.
* A **Book** *is a* **Product**, but it also has an **author**.

We can create a parent **Product** class and have **Clothing** and **Book** child classes that *inherit* from it.

### How to Use Inheritance

We use the **extends** and **super()** keywords.

    // 1. Parent Class
    class Product {
      constructor(inputName, inputPrice) {
        this.name = inputName;
        this.price = inputPrice;
      }
    
      display() {
        console.log(`Product: ${this.name}, Price: $${this.price}`);
      }
    }

    // 2. Child Class
    // 'Clothing' inherits from 'Product'
    class Clothing extends Product {
      // It needs its *own* constructor
      constructor(inputName, inputPrice, inputSize) {
        // 3. super()
        // This *must* be called first.
        // It calls the constructor() of the parent class (Product)
        // to set up the 'name' and 'price'.
        super(inputName, inputPrice);
    
        // 4. Add new properties
        this.size = inputSize;
      }
    
      // 5. Add new methods
      displaySize() {
        console.log(`Size: ${this.size}`);
      }
    }

### Using the Child Class

    // Create an instance of the child class
    const shirt = new Clothing('T-Shirt', 25, 'L');
    
    // We can use methods from the parent (Product)
    shirt.display(); // Output: Product: T-Shirt, Price: $25
    
    // We can use methods from the child (Clothing)
    shirt.displaySize(); // Output: Size: L



---

## 4. Refactoring our Cart with OOP

Let's use these concepts to make our cart code much better. We will create a **Cart Class**.

* **Data:** The **cart** array and **localStorage** key.
* **Methods:** **loadCart()**, **saveToStorage()**, **addToCart()**, **removeFromCart()**, **updateDeliveryOption()**.

**`data/cart-class.js` (New File):**

    class Cart {
      // These are properties of the class
      cartItems;
      localStorageKey;
    
      // The constructor sets up the cart
      constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
      }
    
      // This method loads the cart from localStorage
      loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
    
        if (!this.cartItems) {
          this.cartItems = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
          }];
        }
      }
    
      // This method saves the cart
      saveToStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
      }
    
      // This is a method
      addToCart(productId) {
        let matchingItem;
    
        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        });
    
        if (matchingItem) {
          matchingItem.quantity += 1;
        } else {
          this.cartItems.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
          });
        }
    
        this.saveToStorage();
      }
    
      // This is a method
      removeFromCart(productId) {
        const newCart = [];
        this.cartItems.forEach((cartItem) => {
          if (cartItem.productId !== productId) {
            newCart.push(cartItem);
          }
        });
    
        this.cartItems = newCart;
        this.saveToStorage();
      }
    
      // This is a method
      updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
    
        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        });
    
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
      }
    } // End of the Cart class

### How to Use the Class

Now, in our **checkout.js** and **main.js** files, we just **import** the class and create an **instance**.

**`scripts/checkout.js` (Updated):**

    // 1. Import the class
    import { Cart } from '../data/cart-class.js';
    
    // 2. Create an instance of the cart
    const cart = new Cart('cart-oop');
    
    // ... all our other imports (products, dayjs, etc.)
    
    let cartSummaryHTML = '';
    
    // 3. Now we use the object's properties
    cart.cartItems.forEach((cartItem) => {
      // ... (rest of the code is the same)
    });
    
    // ...
    // And when we update the page, we use the class's methods
    // For example, when deleting:
    // ...
    //   cart.removeFromCart(productId);
    // ...

This is far more organized. All the logic for *how* the cart works is hidden inside the **Cart** class. The **checkout.js** file only needs to *use* it.

---

## ✏️ Lesson 17 Exercises

*(From the SuperSimpleDev video slides)*

* **17a.** What is OOP?
* **17b.** What is the problem with procedural code?
* **17c.** What is a class? What is an instance?
* **17d.** What is the **constructor()**?
* **17e.** What is the **new** keyword?
* **17f.** What is the **this** keyword?
* **17g.** Create a **Product** class (with **name** and **price**).
* **17h.** Add a method **display()** to the **Product** class.
* **17i.** Create 2 instances of the **Product** class.
* **17j.** What is inheritance?
* **17k.** What is the **extends** keyword?
* **17l.** What is the **super()** keyword?
* **17m.** Create a **Clothing** class that **extends** **Product**.
* **17n.** Add a **size** property to the **Clothing** class.
* **17o.** Create an instance of the **Clothing** class.
* **17p.** (Refactor) Put the **cart** and its functions into a **Cart** class.
* **17q.** (Refactor) Add **loadFromStorage()** and **saveToStorage()** methods.
* **17r.** (Refactor) Add **addToCart()**, **removeFromCart()**, etc. as methods.
* **17s.** (Refactor) Use the **Cart** class in **checkout.js**.
* **17t.** (Refactor) Use the **Cart** class in **main.js**.
* **17u.** (Refactor) Update the tests in **cart-test.js** to test the new **Cart** class. (This involves mocking **localStorage** and creating a new **Cart** instance in **beforeEach**).
