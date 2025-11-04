// Use 'const' because these variables will not be reassigned.
const buttonSubscribe = document.querySelector(".js-button-subscribe");
const paragraph = document.querySelector(".subscribe-heading");

buttonSubscribe.addEventListener("click", Subscribe);

function Subscribe() {
  // We check the *new* state class
  if (buttonSubscribe.classList.contains("is-subscribed")) {
    
    // --- Logic to UN-subscribe ---
    buttonSubscribe.innerText = "Subscribe";
    paragraph.innerText = "Subscribe To Our Channel";
    buttonSubscribe.classList.remove("is-subscribed"); // Use the new class

  } else {
    
    // --- Logic to Subscribe ---
    buttonSubscribe.innerText = "Subscribed";
    paragraph.innerText = "Thank You For Subscribing!";
    buttonSubscribe.classList.add("is-subscribed"); // Use the new class
  }
}