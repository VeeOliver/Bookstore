import '../style.css'

async function getJSON(url) {
  let rawData = await fetch(url)
  let data = await rawData.json()
  return data;
}

async function start() {
  let books = await getJSON('./json/books.json')
  let html = '';
  for (let book of books) {
    html += `
      <div class="bookThumbnail">
        <img src="/imgs/bookPlaceholderImage.jpg" class="thumbnail">
          <h3>${book.title}</h3>
        <p>Author:${book.author}</p>
     <p>Price:${book.price}</p>
    `;
    /*  for (let key in book) {
       let value = book[key];
       html += `<p><span>${key}:</span> ${value}</p>`
     }
     html += '</div>'; // end the person div */
  }
  document.querySelector('main').innerHTML = html;
}


start();