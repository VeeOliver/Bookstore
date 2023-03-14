import '../style.css'
import { getBookInfo } from './singleBook'

let cart = []
let currentRowTotal
let total

export function addToCart(books, id) {
  let addedBook = getBookInfo(books, id)
  cart.push(addedBook)
  currentRowTotal = updateRowTotal(addedBook)
  displayCartItems(currentRowTotal)
  document.getElementById('itemCount').innerHTML = `
  <span id="itemCount">${cart.length}</span>`
  console.log(cart)
  calculateTotals()
}

function calculateTotals() {
  total = 0
  cart.forEach(item => {
    total += item.price
  });
  return total

}

function updateRowTotal(addedBook) {
  let quantity = 0
  let rowTotal = 0
  cart.forEach(item => {
    if (item.id === addedBook.id) {
      quantity += 1
    }
  });
  rowTotal = quantity * addedBook.price
  return rowTotal
}

function removeItem() {

}

function displayCartItems(currentRowTotal) {
  total = calculateTotals()
  let htmlArray = cart.map(({
    title, author, price, id
  }) => `
    <div class="bookRow" id=${id}>
    <img src="/imgs/bookPlaceholderImage.jpg" class="thumbnailPicture">
      <h3>${title}</h3>
      <p><span>Author: </span>${author}</p>
       <p><span>Price: </span>${price} SEK</p>
    </div>
  `);
  document.getElementById('modalBodyText').innerHTML = htmlArray.join('')
  document.getElementById('modalFooterText').innerHTML = `
          <p><span>Total: </span>${total} SEK</p>
          <button type="button" class="btn" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn">Checkout</button>`
} 
