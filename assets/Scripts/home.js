
console.log("hello");

import { fetchData, createCategoryCheckboxes, displayEvents, filterEvents } from '../modules/funtions.js';


const container1 = document.getElementById("container1");
const checkboxContainer1 = document.getElementById("checkboxContainer");
const searchInp = document.querySelector('input[type="search"]');
const searchBut = document.getElementById('searchButton');


let allEvents = [];


function init() {
  fetchData()
    .then(data => {
      allEvents = data.events;

     
      createCategoryCheckboxes(allEvents, checkboxContainer1);
      displayEvents(allEvents, container1);

      
      searchBut.addEventListener('click', handleSearch);
      searchInp.addEventListener('input', handleSearch);
      checkboxContainer1.addEventListener('change', handleSearch);
    })
    .catch(error => {
      container1.innerHTML = '<p class="text-center text-danger">Error loading events. Please try again later.</p>';
      console.error('Error initializing app:', error);
    });
}

function handleSearch() {
  const searchTerm = searchInp.value.toLowerCase().trim();
  const selectedCategories = Array.from(document.querySelectorAll('.form-check-input:checked'))
    .map(checkbox => checkbox.value);

  const filteredEvents = filterEvents(allEvents, searchTerm, selectedCategories);
  displayEvents(filteredEvents, container1);
}

document.addEventListener('DOMContentLoaded', init);