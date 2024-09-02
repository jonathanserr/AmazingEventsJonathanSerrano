
export function fetchData() {
    // api
    return fetch('https://aulamindhub.github.io/amazing-api/events.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
}

// chechbox por categoria
export function createCategoryCheckboxes(events, checkboxContainer) {
    const categories = [...new Set(events.map(event => event.category))];
    const fragment = document.createDocumentFragment();
    categories.forEach(category => {
        const checkbox = document.createElement('div');
        checkbox.className = 'form-check mt-2';
        checkbox.innerHTML = `
        <input class="form-check-input" type="checkbox" value="${category}" id="${category}">
        <label class="form-check-label text-success" for="${category}">${category}</label>
      `;
        fragment.appendChild(checkbox);
    });
    checkboxContainer.innerHTML = '';
    checkboxContainer.appendChild(fragment);
}

// pintar eventos
export function displayEvents(events, container) {
    if (events.length === 0) {
        container.innerHTML = '<p class="text-center">At this time we do not have events for your search.</p>';
        return;
    }

    const row = document.createElement('div');
    row.className = 'row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center';

    // tarjeta por evento
    row.innerHTML = events.map(event => `
    <div class="col-md-6 px-2 mb-3">
        <div class="card h-100 bg-secondary bg-opacity-50" key="${event._id}" data-favorite="false">
        <img src="${event.image}" class="card-img-top h-50" alt="image">
        <div class="card-body">
        <h3 class="card-title text-center text-primary">${event.name}</h3>
        <p class="card-text">${event.description}</p>
        </div>
        <div class="d-flex px-2 py-3">
        <div class="text-danger p-2 fw-bold">$ ${event.price}</div>
        <div class="p-2 ms-auto">
        <a href="./assets/Pages/Details.html?id=${event._id}" class="btn btn-primary">Details</a>
        </div>
        </div>
        </div>
    </div>
    `).join('');

    container.innerHTML = '';
    container.appendChild(row);
}

// Función filtro
export function filterEvents(events, searchTerm, selectedCategories) {
    return events.filter(event => {
        const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);
        return matchesSearch && matchesCategory;
    });
}

// Función details
export function displayEventDetails(event) {
    const detailsContainer = document.getElementById('eventDetails');
    detailsContainer.innerHTML = `
      <div class="ContainerDetails">
        <div class="row">
          <div class="col-12">
            <div class="card shadow" style="max-width: 1000px; margin: auto;">
              <div class="row g-0">
                <div class="col-md-6 p-0">
                  <img src="${event.image}" class="img-fluid w-100 h-100" style="object-fit: cover; max-height: 404px;" alt="${event.name}">
                </div>
                <div class="col-md-6">
                  <div class="card-body h-100 d-flex flex-column">
                    <h2 class="card-title mb-4">${event.name}</h2>
                    <ul class="list-group list-group-flush flex-grow-1">
                      <li class="list-group-item"><strong>Date:</strong> ${event.date}</li>
                      <li class="list-group-item"><strong>Description:</strong> ${event.description}</li>
                      <li class="list-group-item"><strong>Category:</strong> ${event.category}</li>
                      <li class="list-group-item"><strong>Place:</strong> ${event.place}</li>
                      <li class="list-group-item"><strong>Capacity:</strong> ${event.capacity}</li>
                      ${event.assistance ? `<li class="list-group-item"><strong>Assistance:</strong> ${event.assistance}</li>` : ''}
                      ${event.estimate ? `<li class="list-group-item"><strong>Estimate:</strong> ${event.estimate}</li>` : ''}
                      <li class="list-group-item"><strong>Price:</strong> $${event.price}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
}


export function displayErrorMessage(message) {
    const detailsContainer = document.getElementById('eventDetails');
    detailsContainer.innerHTML = `<p class="text-center text-danger">${message}</p>`;
}

