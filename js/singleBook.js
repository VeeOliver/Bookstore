import '../style.css'

export function displaySingleBook(books, id) {
  console.log(id)
  let currentBook = books.filter(book => book.id === parseInt(id))
  console.log(currentBook)

}
