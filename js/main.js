import '../style.css'
import { start } from './sortAndFiter'
import { loadAboutPage } from './aboutPage';

//start the libary and place link to the about page 
start()
document.querySelector('#about').addEventListener('click', event => {
  loadAboutPage()
})


