
import '../style.css'

//create a featured books carousel to put on the front page 
export function showFeaturedBooks() {
  document.querySelector('.featuredBooks').innerHTML =
    `<h1 class="homeText"><span class="newKeyword">New</span> from the Vault: The Beginners Series</h1>
  <div class=landingPage>
  <div class="carousel-container">
    <div id="carouselExampleCaptions" class="carousel slide">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
          aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
          aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
          aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3"
          aria-label="Slide 4"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="imgs/bookCovers/1.png" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="imgs/bookCovers/6.png" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="imgs/bookCovers/11.png" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="imgs/bookCovers/16.png" class="d-block w-100" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  <h2 class="descriptionText">Whether you're interested in learning the basics, or simply wanting to brush up on your core knowledge, The Beginner's Series has something for every level of developer.</h2>
  </div>`

}