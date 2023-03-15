import '../style.css'
import { start } from './sortAndFiter'

export function displaySingleBook(books, id) {
  let singleBook = getBookInfo(books, id)
  /* let currentBook = books.filter(book => book.id === parseInt(id))
  let singleBook = currentBook[0] */
  let singleBookHtml =
    `<div class="row">
    <div class="col">
      <img src="/imgs/bookCovers/${singleBook.id}.png" class="largePicture">
      <h3 class="title">${singleBook.title}</h3>
      <p class="author">Author: ${singleBook.author} </p>
      <p class="description">Description: ${singleBook.description}</p>
      <p class="category">Category: ${singleBook.category}</p>
      <p class="price">Price: ${singleBook.price}</p>
      <button class="cartBtn">Add to Cart</button>
       <button class="backBtn" id="backBtn">Back to Library</button>
    </div>
  </div>`
  document.querySelector('main').innerHTML = singleBookHtml

  document.querySelector('.backBtn').addEventListener('click', e => {
    reloadLibrary()
  })
}

export function getBookInfo(books, id) {
  let currentBook = books.filter(book => book.id === parseInt(id))
  let singleBook = currentBook[0]
  return singleBook
}


function reloadLibrary() {
  let libraryhtml = `
    <div class="featuredBooks"></div>
      <h2>Library</h2>
    <div class="filters"></div>
    <div class="sortingOptions"></div>
    <div class="bookList"></div>
  </main >`

  document.querySelector('main').innerHTML = libraryhtml
  start()
}