console.log("Hello2");
import { fetchData, createCategoryCheckboxes, displayEvents, filterEvents } from '../modules/funtions.js';

const contenedor = document.getElementById("container1");
const checkboxContainer1 = document.getElementById("checkboxContainer");
const searchInp = document.querySelector('input[type="search"]');
const searchBut = document.querySelector('searchButton');
let upcomingEvents = [];

function init() { 
  fetchData()
    .then(data => {
      const currentDate = new Date(data.currentDate);
      upcomingEvents = data.events.filter(event => new Date(event.date) >= currentDate);
      createCategoryCheckboxes(upcomingEvents, checkboxContainer1);
      displayEvents(upcomingEvents, contenedor);

      searchInp.addEventListener('input', handleSearch);
      searchInp.addEventListener('keypress', handleEnterKey);
      checkboxContainer1.addEventListener('change', handleSearch);
    })
    .catch(error => {
      contenedor.innerHTML = '<p class="text-center text-danger">Error al cargar los eventos. Por favor, intente más tarde.</p>';
      console.error('Error initializing app:', error);
    });
}

function handleEnterKey(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    handleSearch();
  }
}

function handleSearch() {
  const searchTerm = searchInp.value.toLowerCase().trim();
  const selectedCategories = Array.from(document.querySelectorAll('.form-check-input:checked'))
    .map(checkbox => checkbox.value);

  const filteredEvents = filterEvents(upcomingEvents, searchTerm, selectedCategories);
  displayEvents(filteredEvents, contenedor);
}
document.addEventListener('DOMContentLoaded', init);