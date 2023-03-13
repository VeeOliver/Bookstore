
import '../style.css'
function featuredBooks() {
  document.querySelector('.featuredBooks').innerHTML =
    `<h1><span class="newKeyword">New</span> from the Vault: The Beginners Collection</h1>
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
          <img src="imgs/bookPlaceholderImage.jpg" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>First book bootstrap</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="imgs/bookPlaceholderImage.jpg" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>Second book html</h5>
            <p>Some representative placeholder content for the second slide.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="imgs/bookPlaceholderImage.jpg" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>Third book CSS</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="imgs/bookPlaceholderImage.jpg" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>Fourth book JS</h5>
            <p>Some representative placeholder content for the fourth slide.</p>
          </div>
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
  </div>`

}