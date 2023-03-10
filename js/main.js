import '../style.css'

let books;

async function getJSON(url) {
  let rawData = await fetch(url)
  let data = await rawData.json()
  return data;
}

async function start() {
  books = await getJSON('./json/books.json')
  displayBooks()
}

function displayBooks() {
  let html = '<h2>Library</h2>';
  for (let book of books) {
    html += `
      <div class="bookThumbnail">
        <img src="/imgs/bookPlaceholderImage.jpg" class="thumbnailPicture">
          <h3>${book.title}</h3>
        <p>Author:${book.author}</p>
        <p>Price:${book.price}</p>
     </div>
    `;
  }
  document.querySelector('main').innerHTML = html;
}


start();