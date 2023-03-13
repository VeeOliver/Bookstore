import '../style.css'
import { start } from './sortAndFiter'
import { loadAboutPage } from './aboutPage.js';

start();
document.querySelector('#about').addEventListener('click', event => {
  loadAboutPage()
})