import '../style.css'
import { start } from './sortAndFiter'
import { addToCart } from './shoppingCart'

//html for the dingle book display
export function displaySingleBook(books, id) {
  let singleBook = getBookInfo(books, id)
  let singleBookHtml =
    `
    <div class="container">
    <div class="row">
      <img src="/imgs/bookCovers/${singleBook.id}.png" class="largePicture">
      <div class="col-xl">
      <h3 class="title">${singleBook.title}</h3>
      <p class="author">Author: ${singleBook.author} </p>
      <p class="description">Description: ${singleBook.description}</p>
      <p class="category">Category: ${singleBook.category}</p>
      <p class="price">Price: ${singleBook.price}</p>
      <button class="cartBtn">Add to Cart</button>
       <button class="backBtn" id="backBtn">Back to Library</button>
    </div>
    </div>
  </div>`
  document.querySelector('main').innerHTML = singleBookHtml

  document.querySelector('.backBtn').addEventListener('click', e => {
    reloadLibrary()
  })

  document.querySelector('.cartBtn').addEventListener('click', e => {
    addToCart(books, id)
  })

}

//gets the information for the selected book 
export function getBookInfo(books, id) {
  let currentBook = books.filter(book => book.id === parseInt(id))
  let singleBook = currentBook[0]
  return singleBook
}

//roloads neccisary html for the back to library button 
function reloadLibrary() {
  let libraryhtml = `
    <div class="featuredBooks"></div>
    <div class="library">
      <h1>Library</h1>
      <div class="filters"></div>
      <div class ="chosenFilter"></div>
      <div class="sortingOptions"></div>
      <div class="bookList"></div>
    </div>`

  document.querySelector('main').innerHTML = libraryhtml
  start()
}