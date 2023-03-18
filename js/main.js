import '../style.css'
import { start } from './sortAndFiter'
import { loadAboutPage } from './aboutPage';

start()
document.querySelector('#about').addEventListener('click', event => {
  loadAboutPage()
})


