import '../style.css'

let books,
  chosenCategoryFilter = 'all',
  chosenSortOption,
  categories = [];

async function getJSON(url) {
  let rawData = await fetch(url)
  let data = await rawData.json()
  return data;
}

async function start() {
  books = await getJSON('./json/books.json');
  getCategories();
  addFilters();
  addSortingOptions();
  sortByTitle(books);
  sortByAuthor(books);
  displayBooks();
}

function sortByAuthor(books) {
  books.sort(({ title: aTitle }, { title: bTitle }) =>
    aTitle > bTitle ? 1 : -1);
}

function sortByTitle(books) {
  books.sort(({ title: aAuthor }, { title: bAuthor }) =>
    aAuthor > bAuthor ? 1 : -1);
}

function sortByPrice(books) {
  books.sort(({ price: aPrice }, { price: bPrice }) =>
    aPrice > bPrice ? 1 : -1);
}

function addSortingOptions() {
  // create and display html
  document.querySelector('.sortingOptions').innerHTML = `
    <label><span>Sort by:</span>
      <select class="sortOption">
        <option>--Unsorted--</option> 
        <option>Author</option>
        <option>Price</option>
        <option>Title</option>
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
  // create an array of all hobbies that people have
  let withDuplicates = books.map(book => book.category);
  // remove duplicates by creating a set
  // that we then spread into an array to cast it to an array
  categories = [...new Set(withDuplicates)];
  // sort the hobbies 
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
  if (chosenSortOption === 'Author') { sortByAuthor(filteredBooks); }
  if (chosenSortOption === 'Price') { sortByPrice(filteredBooks); }
  if (chosenSortOption === 'Title') { sortByTitle(filteredBooks); }
  let htmlArray = filteredBooks.map(({
    title, author, price
  }) => `
    <div class="bookThumbnail">
    <img src="/imgs/bookPlaceholderImage.jpg" class="thumbnailPicture">
      <h3>${title} </h3>
      <p><span>Author: </span>${author}</p>
       <p><span>Price: </span>${price} SEK</p>
    </div>
  `);
  document.querySelector('.bookList').innerHTML = htmlArray.join('');
}


start();