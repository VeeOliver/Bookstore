import '../style.css'
import { getJSON } from "./utils/getJSON";

let books

export async function displaySingleView() {
  books = await getJSON('./json/books.json');
  let html = books.map(({
    title, author, description, category, price
  }) => `
    <div class="largeDisplay" id="individualBookLg">
    <img src="/imgs/bookPlaceholderImage.jpg" class="largePicture">
      <h3>${title} </h3>
      <p><span>Author: </span>${author}</p>
       <p><span>Price: </span>${price} SEK</p>
        <p><span>Category: </span>${category}</p>
         <p><span>Author: </span>${description}</p>
    </div>
  `);
  document.body.innerHTML.replace(html)
}