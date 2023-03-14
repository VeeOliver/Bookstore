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
}


export function showCartItems() {
  let cartItems
  if (cart.length === 0) {
    cartItems = `
        <p><a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
          Link with href
        </a>
      </p>
      <div class="collapse" id="collapseExample">
        <div class="card card-body">
          <p> Your Cart is Empty </p>
      </div>`
  } else
    cartItems = cart.map(({ title, author, price }) => {
      `<p>
    <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
      Link with href
    </a>
  </p>
  <div class="collapse" id="collapseExample">
    <div class="card card-body">
     <h3>${title}</h3>
      <h3>${author}</h3>
      <h3>${price}</h3>
  </div>`
    })
  document.getElementById('bagIcon').innerHTML = cartItems
}

function bookInCart() {

}
