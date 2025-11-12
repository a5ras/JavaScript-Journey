const api_url = "https://api.quotable.io/random"

const quote =  document.getElementById("quote")
const author =  document.getElementById("author")
const button = document.getElementById("buttonRefreach")

async function getQuote(url) {
  const response = await fetch(url)
  let data = await response.json()
  quote.innerHTML = data.content  
  author.innerHTML = data.author
}
button.addEventListener("click",newQuote)
function newQuote(){
  getQuote(api_url)
}
