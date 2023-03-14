import '../style.css'
import { getBookInfo } from './singleBook'

let cart = []

export function addToCart(books, id) {
  //let addBook = books.filter(book => book.id === parseInt(id))
  let addedBook = getBookInfo(books, id)
  cart.push(addedBook)
  document.getElementById('itemCount').innerHTML = `
  <span id="itemCount">${cart.length}</span>`
  console.log(cart)
  calculateTotals()
}

function calculateTotals() {
  let total = 0
  cart.forEach(item => {
    total += item.price
  });

  console.log(total)
}

function showCartItems() {

}

function bookInCart() {

}
