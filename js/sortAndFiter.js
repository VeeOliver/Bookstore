import '../style.css'
import { getJSON } from './utils/getJSON';
import { showFeaturedBooks } from './featuredBooks';
import { displaySingleBook } from './singleBook';
import { addToCart } from './shoppingCart';

//call all functions to load the library 
export async function start() {
  books = await getJSON('./json/books.json');
  showFeaturedBooks();
  getCategories();
  getAuthors();
  addFilters();
  addSortingOptions();
  sortByTitleAtoZ(books);
  sortByTitleZtoA(books)
  sortByAuthorAtoZ(books);
  sortByAuthorZtoA(books);
  displayBooks();
}

let books,
  chosenFilter = 'all',
  chosenCategoryFilter = 'all',
  chosenAuthorFilter = 'all',
  chosenPriceFilter = 'all',
  chosenSortOption,
  categories = [],
  authors = [],
  filteredBooks = []

//sorts books alphabetically by author
function sortByAuthorAtoZ(books) {
  books.sort(({ author: aAuthor }, { author: bAuthor }) =>
    aAuthor > bAuthor ? 1 : -1);
}

//sort books opposite by author
function sortByAuthorZtoA(books) {
  books.sort(({ author: aAuthor }, { author: bAuthor }) =>
    aAuthor < bAuthor ? 1 : -1);
}

//sort books alphabetially by title 
function sortByTitleAtoZ(books) {
  books.sort(({ title: aAuthor }, { title: bAuthor }) =>
    aAuthor > bAuthor ? 1 : -1);
}
//sorts opposite by title 
function sortByTitleZtoA(books) {
  books.sort(({ title: aAuthor }, { title: bAuthor }) =>
    aAuthor < bAuthor ? 1 : -1);
}
//sorts by ascending price
function sortByPriceAsc(books) {
  books.sort(({ price: aPrice }, { price: bPrice }) =>
    aPrice > bPrice ? 1 : -1);
}
//sorts by descending price
function sortByPriceDes(books) {
  books.sort(({ price: aPrice }, { price: bPrice }) =>
    aPrice < bPrice ? 1 : -1);
}

function addSortingOptions() {
  // create and display options
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

  document.querySelector('.sortOption').addEventListener('change', event => {
    chosenSortOption = event.target.value;
    displayBooks();
  });
}

function getCategories() {
  //get an array with all possible categories
  let withDuplicates = books.map(book => book.category)
  // remove duplicates by creating a set
  categories = [...new Set(withDuplicates)]

  categories.sort()
}

function getAuthors() {
  //do the same array function with authors
  let withDuplicates = books.map(book => book.author)
  authors = [...new Set(withDuplicates)]
  authors.sort()
}

function addFilters() {
  // create filter options
  document.querySelector('.filters').innerHTML = `
    <label><span>Filter by:</span>
      <select class="chooseFilter">
        <option>all</option>
        <option>Author</option>
        <option>Category</option>
        <option>Price Interval</option>
      </select>
    </label>
  `;

  document.querySelector('.chooseFilter').addEventListener(
    'change',
    event => {
      // get the selected hobby
      chosenFilter = event.target.value;
      applyFilters(chosenFilter)
      console.log(chosenFilter)
      //displayBooks();
    }
  );
}

function applyFilters(chosenFilter) {
  //depending on the filter option, assign the filteredBooks array to the correct filter options
  if (chosenFilter === 'Author') {
    console.log('author was selected')
    document.querySelector('.chosenFilter').innerHTML = `
    <label><span>Filter by Author:</span>
      <select class="authorFilter">
        <option>all</option>
        ${authors.map(author => `<option>${author}</option>`).join('')}
      </select>
    </label>
  `
    document.querySelector('.authorFilter').addEventListener(
      'change',
      event => {
        chosenAuthorFilter = event.target.value;
        console.log(chosenAuthorFilter)
        filteredBooks = books.filter(
          ({ author }) => chosenAuthorFilter === 'all'
            || chosenAuthorFilter === author
        )
        displayBooks();
      }
    )
  }

  if (chosenFilter === 'Price Interval') {
    document.querySelector('.chosenFilter').innerHTML = `
    <label><span>Filter by Price Interval:</span>
      <select class="priceFilter">
        <option>all</option>
         <option> 0 - 500 SEK</option>
         <option> 500 - 1000 SEK</option>
         <option>  > 1000 SEK</option>
      </select>
    </label>
  `
    document.querySelector('.priceFilter').addEventListener(
      'change',
      event => {
        chosenPriceFilter = event.target.value;
        console.log(chosenPriceFilter)
        filteredBooks = applyPriceFilter(chosenPriceFilter)
        displayBooks();
      }
    )
    console.log('price interval was selected')
  }

  if (chosenFilter === 'Category') {
    document.querySelector('.chosenFilter').innerHTML = `
    <label><span>Filter by category:</span>
      <select class="categoryFilter">
        <option>all</option>
        ${categories.map(category => `<option>${category}</option>`).join('')}
      </select>
    </label>
  `
    document.querySelector('.categoryFilter').addEventListener(
      'change',
      event => {
        // get the selected hobby
        chosenCategoryFilter = event.target.value;
        filteredBooks = books.filter(
          ({ category }) => chosenCategoryFilter === 'all'
            || chosenCategoryFilter === category
        )
        displayBooks();
      }
    )
  }
}

function applyPriceFilter(priceRange) {
  //helper method to determine which price interval will be loaded into the array 
  let filteredPrices = []
  console.log(priceRange)
  if (priceRange == '0 - 500 SEK') {
    books.forEach((book => {
      if (parseInt(book.price) < 500) {
        filteredPrices.push(book)
      }
    }))
  }
  if (priceRange == '500 - 1000 SEK') {
    books.forEach((book => {
      if (parseInt(book.price) > 500 && book.price < 1000) {
        filteredPrices.push(book)
      }
    }))
  }
  if (priceRange == '> 1000 SEK') {
    books.forEach((book => {
      if (parseInt(book.price) > 1000) {
        filteredPrices.push(book)
      }
    }))
  }
  return filteredPrices
}

function displayBooks() {
  // filter according to filter options and call displayBooks
  if (filteredBooks.length < 1) {
    filteredBooks = books
  }

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
    <img src="/imgs/bookCovers/${id}.png" class="thumbnailPicture">
      <h3 class="thumbnailTitle">${title}</h3>
      <p><span>Author: </span>${author}</p>
       <p><span>Price: </span>${price} SEK</p>
       <button type="button" class="infoBtn" id=${id}>More Info</button>
       <button type="button" class="cartBtn" id=${id}">Add to Cart</button>
    </div>
  `);

  document.querySelector('.bookList').innerHTML = htmlArray.join('')

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

