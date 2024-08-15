
function fetchAllEvents() {
    fetch('http://localhost:3002/api/Event/all_Events')
        .then(response => response.json())
        .then(data => {
            displayEvents(data);
        })
        .catch(error => {
            console.error('Error fetching events:', error);
        });
}


document.getElementById('search-button').addEventListener('click', function() {
    const searchQuery = document.getElementById('search-input').value;
    fetch(`http://localhost:3002/api/Event/search_by_name/${searchQuery}`)
        .then(response => response.json())
        .then(events => displayEvents(events))
        .catch(error => console.error('Error:', error));
});

document.getElementById('filter-button').addEventListener('click', function() {
    const category = document.getElementById('category-filter').value;
    const location = document.getElementById('location-filter').value;
    const date = document.getElementById('date-filter').value;

    let url = 'http://localhost:3002/api/Event/all_Events';

    if (category) {
        url = `http://localhost:3002/api/Event/search_by_category/${category}`;
    } else if (location) {
        url = `http://localhost:3002/api/Event/search_by_loc/${location}`;
    } else if (date) {
        url = `http://localhost:3002/api/Event/search_by_date/${date}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(events => displayEvents(events))
        .catch(error => console.error('Error:', error));
});

function displayEvents(events) {
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = '';

    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <h3>${event.title}</h3>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Date:</strong> ${event.start_datetime}</p>
            <p><strong>Category:</strong> ${event.category}</p>
            <p><strong>id:</strong> ${event.evnt_id} <i>(use this id for purchse & see attendee)</i></p>
            <p>${event.description}</p>
            <a href="C:/Node js/server7/front_end/tkt_book/book.html">
    <button type="button"  title="purchase" 
          style=
          "
            background-color:blue; 
            color: white;
            padding: 10px 20px; 
            border: none;
            border-radius: 5px; 
            cursor: pointer; "
            >
              Purchase
             </button>
            </a>
            <a href="C:/Node js/server7/front_end/see_attendee/attendee.html">
    <button type="button"  title="purchase" 
          style=
          "
            background-color:green; 
            color: white;
            padding: 10px 20px; 
            border: none;
            border-radius: 5px; 
            cursor: pointer; "
            >
              See Attendee
             </button>
            </a>

        `;
        eventList.appendChild(eventCard);
    });
}
window.onload = fetchAllEvents;


