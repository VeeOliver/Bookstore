import '../style.css'

export function loadAboutPage() {
  document.querySelector('main').innerHTML =
    `<div class="aboutPage">
    <h1> ABOUT </h1>
    <p> Welcome to Digital Vault Books, the premier destination for computer science enthusiasts and professionals alike. Our bookstore is dedicated to providing a wide range of high-quality books on computer science, programming, artificial intelligence, and other related topics.</p>

    <p>At Digital Vault Books, we understand that the field of computer science is constantly evolving, and we strive to stay on top of the latest trends and advancements in the industry. Our team of knowledgeable and passionate staff carefully curates our selection of books to ensure that we offer the most up-to-date and relevant titles available. <p> 
    </div>
    `
}