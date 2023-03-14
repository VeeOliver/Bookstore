import { Button } from 'bootstrap';
import '../style.css'
import { getJSON } from './utils/getJSON';
import { showFeaturedBooks } from './featuredBooks';
import { displaySingleBook } from './singleBook';
import { addToCart, showCartItems } from './shoppingCart';

export async function start() {
  books = await getJSON('./json/books.json');
  showFeaturedBooks();
  getCategories();
  addFilters();
  addSortingOptions();
  sortByTitleAtoZ(books);
  sortByTitleZtoA(books)
  sortByAuthorAtoZ(books);
  sortByAuthorZtoA(books);
  displayBooks();
  checkCart();
}

let books,
  chosenCategoryFilter = 'all',
  chosenSortOption,
  categories = []

function sortByAuthorAtoZ(books) {
  books.sort(({ author: aAuthor }, { author: bAuthor }) =>
    aAuthor > bAuthor ? 1 : -1);
}

function sortByAuthorZtoA(books) {
  books.sort(({ author: aAuthor }, { author: bAuthor }) =>
    aAuthor < bAuthor ? 1 : -1);
}

function sortByTitleAtoZ(books) {
  books.sort(({ title: aAuthor }, { title: bAuthor }) =>
    aAuthor > bAuthor ? 1 : -1);
}

function sortByTitleZtoA(books) {
  books.sort(({ title: aAuthor }, { title: bAuthor }) =>
    aAuthor < bAuthor ? 1 : -1);
}

function sortByPriceAsc(books) {
  books.sort(({ price: aPrice }, { price: bPrice }) =>
    aPrice > bPrice ? 1 : -1);
}

function sortByPriceDes(books) {
  books.sort(({ price: aPrice }, { price: bPrice }) =>
    aPrice < bPrice ? 1 : -1);
}

function addSortingOptions() {
  // create and display html
  document.querySelector('.sortingOptions').innerHTML = `
    <label><span>Sort by:</span>
      <select class="sortOption">
      <option>--choose sort--</option>
        <option>Title (A-Z)</option>
        <option>Title (Z-A)</option>
        <option>Author (A-Z)</option>
        <option>Author (Z-A)</option>
        <option>Price (low-high)</option>
        <option>Price (high-low)</option>
      </select>
    </label>
  `;
  // add an event listener
  document.querySelector('.sortOption').addEventListener('change', event => {
    chosenSortOption = event.target.value;
    displayBooks();
  });
}

function getCategories() {
  // create an array of all book categories
  let withDuplicates = books.map(book => book.category);
  // remove duplicates by creating a set
  // that we then spread into an array to cast it to an array
  categories = [...new Set(withDuplicates)];
  // sort the categories
  categories.sort();
}

function addFilters() {
  // create and display html
  document.querySelector('.filters').innerHTML = `
    <label><span>Filter by category:</span>
      <select class="categoryFilter">
        <option>all</option>
        ${categories.map(category => `<option>${category}</option>`).join('')}
      </select>
    </label>
  `;
  // add an event listener
  document.querySelector('.categoryFilter').addEventListener(
    'change',
    event => {
      // get the selected hobby
      chosenCategoryFilter = event.target.value;
      displayBooks();
    }
  );
}

function displayBooks() {
  // filter according to category and call displayBooks
  let filteredBooks = books.filter(
    ({ category }) => chosenCategoryFilter === 'all'
      || chosenCategoryFilter === category
  );
  if (chosenSortOption === '--Unsorted--') { filteredBooks = books }
  if (chosenSortOption === 'Author (A-Z)') { sortByAuthorAtoZ(filteredBooks); }
  if (chosenSortOption === 'Author (Z-A)') { sortByAuthorZtoA(filteredBooks); }
  if (chosenSortOption === 'Price (low-high)') { sortByPriceAsc(filteredBooks); }
  if (chosenSortOption === 'Price (high-low)') { sortByPriceDes(filteredBooks); }
  if (chosenSortOption === 'Title (A-Z)') { sortByTitleAtoZ(filteredBooks); }
  if (chosenSortOption === 'Title (Z-A)') { sortByTitleZtoA(filteredBooks); }
  let htmlArray = filteredBooks.map(({
    title, author, price, id
  }) => `
    <div class="bookThumbnail" id=${id}>
    <img src="/imgs/bookPlaceholderImage.jpg" class="thumbnailPicture">
      <h3>${title}</h3>
      <p><span>Author: </span>${author}</p>
       <p><span>Price: </span>${price} SEK</p>
       <button type="button" class="infoBtn" id=${id}>More Info</button>
       <button type="button" class="cartBtn" id=${id}">Add to Cart</button>
    </div>
  `);
  document.querySelector('.bookList').innerHTML = htmlArray.join('')
  //add event listener 

  document.querySelectorAll(`.infoBtn`).forEach(btn => {
    btn.addEventListener('click', e => {
      displaySingleBook(books, e.target.getAttribute('id'))
      //console.log('I have been clicked!', e.target.getAttribute('id'))
    })
  })

  document.querySelectorAll(`.cartBtn`).forEach(btn => {
    btn.addEventListener('click', e => {
      addToCart(books, e.target.getAttribute('id'))
      //console.log('I have been clicked!', e.target.getAttribute('id'))
    })
  })
}

function checkCart() {
  document.getElementById('bagIcon').addEventListener('click', e => {
    showCartItems()
  })
}
