import '../shoppingCart.css'
import { getBookInfo } from './singleBook'

let cart = []
let total

//add book to the cart
export function addToCart(books, id) {
  let addedBook = getBookInfo(books, id)
  if (bookExists(id) === 0) {
    console.log('we should push to array')
    cart.push({
      id: addedBook.id,
      price: addedBook.price,
      quantity: 1,
      title: addedBook.title
    })
  } else {
    console.log('we should increase quantity')
    increaseQuantity(id)
  }

  //change the number of items in the cart to reflect on the navbar 
  displayCartItems()
  document.getElementById('itemCount').innerHTML = `
  <span id="itemCount">${getItemCount()}</span>`
  console.log(cart)
  calculateTotals()
}

//calculate totals for all books
function calculateTotals() {
  total = 0
  cart.forEach(item => {
    total += (item.price * item.quantity)
  });
  return total

}

//check to see if a book is already in the cart
function bookExists(id) {
  let flag = 0
  cart.forEach(item => {
    if (item.id === parseInt(id)) {
      flag = 1
    }
  })
  return flag
}

// update the quantity of a book in the cart 
function increaseQuantity(id) {
  cart.forEach(item => {
    if (item.id === parseInt(id)) {
      item.quantity += 1
      console.log(item.id, item.quantity)
    }
  })
}

//check the quantity each book in the cart 
function getItemCount() {
  let totalItems = 0
  cart.forEach(item => {
    totalItems += item.quantity
  })
  return totalItems
}

//delete a book object from the cart array
function removeItem(id) {
  let index = 0
  cart.forEach(item => {
    if (item.id === parseInt(id)) {
      if (item.quantity === 1) {
        cart.splice(index, 1)
      }
      if (item.quantity > 1) {
        item.quantity -= 1
      }
      index += 1
    }
  })
  displayCartItems()
  document.getElementById('itemCount').innerHTML = `
  <span id="itemCount">${getItemCount()}</span>`
}

//create html for inside the shopping cart modal
function displayCartItems() {
  total = calculateTotals()
  let htmlArray
  if (cart.length === 0) {
    htmlArray = `<div class="modal-body" id="modalBodyText">
          You have no items in your cart :(
        </div>`

    document.getElementById('modalBodyText').innerHTML = htmlArray
  } else {
    htmlArray = cart.map(({
      title, price, id, quantity
    }) =>
      `
      <div class="cartContainer">
    <div class="bookRow" id=${id}>
    <img src="/imgs/bookCovers/${id}.png" class="cartPicture">
    <div class="cart">
      <h3>${title}</h3>
      <div id=${id} class="quantity"> Quantity: ${quantity} </p> 
       <p id="price"><span>Price: </span>${price} SEK</p>
       <p id="rowPrice">Subtotal: ${price * quantity} </p>
       <button class="removeBtn" id=${id}> Remove </button> 
       <br></br>
       </div> 
       </div>
    </div>
  `)

    document.getElementById('modalBodyText').innerHTML = htmlArray.join('')
  };

  document.querySelectorAll(`.removeBtn`).forEach(btn => {
    btn.addEventListener('click', e => {
      console.log('we are in the event listener')
      removeItem(e.target.getAttribute('id'))
    })
  })

  document.getElementById('modalFooterText').innerHTML =
    `
          <h3><span>Total: </span>${total} SEK</h3>
          <br></br>
          <button type="button" class="btn" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn">Checkout</button>`
}


