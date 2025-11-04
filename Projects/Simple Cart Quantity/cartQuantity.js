// --- 1. Global Variable ---
let cartQuantity = 0;

// --- 2. Element Selection ---
// Get all the elements we need to work with
const displayCart = document.querySelector(".js-quantity-display");
const addButton = document.querySelector(".js-add-button");
const addTwoButton = document.querySelector(".js-add1-button");
const removeButton = document.querySelector(".js-remove-button");
const removeTwoButton = document.querySelector(".js-remove2-button");
const resetButton = document.querySelector(".js-reset-button");

// --- 3. Event Listeners ---
// We use "anonymous functions" () => {...} to call our new
// changeQuantity function with the correct *parameter*.
addButton.addEventListener("click", () => {
  changeQuantity(1);
});

addTwoButton.addEventListener("click", () => {
  changeQuantity(2);
});

removeButton.addEventListener("click", () => {
  changeQuantity(-1); // Subtracting is just adding a negative number
});

removeTwoButton.addEventListener("click", () => {
  changeQuantity(-2);
});

// This one calls resetCart directly since it needs no parameter
resetButton.addEventListener("click", resetCart);


// --- 4. Core Functions ---

/**
 * This is the new, single function to change the cart.
 * It takes an 'amount' (like 1, 2, -1, or -2).
 * It also checks for limits *before* making any changes.
 */
function changeQuantity(amount) {
  const newQuantity = cartQuantity + amount;

  // LIMIT CHECK 1: Don't go above 10
  if (newQuantity > 10) {
    alert("Cart is full!");
    return; // This stops the function immediately
  }

  // LIMIT CHECK 2: Don't go below 0
  if (newQuantity < 0) {
    alert("Cart is already empty!");
    return; // This stops the function immediately
  }

  // If both checks pass, update the quantity
  cartQuantity = newQuantity;
  updateQuantityDisplay();
}

/**
 * Resets the cart to 0 and updates the display.
 */
function resetCart() {
  cartQuantity = 0;
  updateQuantityDisplay();
}

/**
 * This function's ONLY job is to update the HTML text.
 */
function updateQuantityDisplay() {
  displayCart.innerText = `Cart quantity: ${cartQuantity}`;
}