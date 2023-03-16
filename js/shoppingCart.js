import '../style.css'
import { getBookInfo } from './singleBook'

let cart = []
let total

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

  displayCartItems()
  document.getElementById('itemCount').innerHTML = `
  <span id="itemCount">${getItemCount()}</span>`
  console.log(cart)
  calculateTotals()
}

function calculateTotals() {
  total = 0
  cart.forEach(item => {
    total += (item.price * item.quantity)
  });
  return total

}

function bookExists(id) {
  let flag = 0
  cart.forEach(item => {
    if (item.id === parseInt(id)) {
      flag = 1
    }
  })
  return flag
}

function increaseQuantity(id) {
  cart.forEach(item => {
    if (item.id === parseInt(id)) {
      item.quantity += 1
      console.log(item.id, item.quantity)
    }
  })
}


function getItemCount() {
  let totalItems = 0
  cart.forEach(item => {
    totalItems += item.quantity
  })
  return totalItems
}

function removeItem(id) {
  console.log('we are in the remove items function')
  let index = 0
  cart.forEach(item => {
    console.log(item.id, 'and the param id is ', parseInt(id))
    if (item.id === parseInt(id)) {
      if (item.quantity === 1) {
        cart.splice(index, 1)
      }
      if (item.quantity > 1) {
        item.quantity -= 1
      }
      console.log('now we are in if statement ', item.quantity)

      index += 1
    }
  })
  displayCartItems()
}


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
    <div class="bookRow" id=${id}>
    <img src="/imgs/bookCovers/${id}.png" class="cartPicture">
      <h3>${title}</h3>
      <div id=${id} class="quantity"> Quantity: ${quantity} </p> 
       <p id="price"><span>Price: </span>${price} SEK</p>
       <p id="rowPrice">Subtotal: ${price * quantity} </p>
       <button class="removeBtn" id=${id}> Remove </button> 
       <br></br> 
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


