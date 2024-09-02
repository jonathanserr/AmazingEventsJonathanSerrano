
import { fetchData, createCategoryCheckboxes, displayEvents, filterEvents } from '../modules/funtions.js';


const contenedor = document.getElementById("container1");
const checkboxContainer = document.getElementById("checkboxContainer");
const searchInput = document.querySelector('input[type="search"]');
const searchButton = document.getElementById('searchButton');

let allEvents = [];
let currentDate;


function init() {
  fetchData()
    .then(data => {
      allEvents = data.events;
      currentDate = data.currentDate;

      const pastEvents = getPastEvents();

      createCategoryCheckboxes(pastEvents, checkboxContainer);
      displayEvents(pastEvents, contenedor);

      searchButton.addEventListener('click', handleSearch);
      searchInput.addEventListener('input', handleSearch);
      checkboxContainer.addEventListener('change', handleSearch);
    })
    .catch(error => {
      console.error('Error initializing page:', error);
      contenedor.innerHTML = '<p class="text-center text-danger">Error loading events. Please try again later.</p>';
    });
}

function getPastEvents() {
  return allEvents.filter(event => new Date(event.date) < new Date(currentDate));
}

function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedCategories = Array.from(document.querySelectorAll('.form-check-input:checked'))
    .map(checkbox => checkbox.value);
  const pastEvents = getPastEvents();
  const filteredEvents = filterEvents(pastEvents, searchTerm, selectedCategories);
  displayEvents(filteredEvents, contenedor);
}

document.addEventListener('DOMContentLoaded', init);