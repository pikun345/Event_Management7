document.getElementById('fetch-events').addEventListener('click', function() {
    fetch('http://localhost:3002/api/Event/all_Events', {
        method: 'GET'
       
    })
    .then(response => response.json())
    
    .then(data => {
        displayEvents(data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to fetch events. Please try again.');
    });

    console.log("data=",data)
});

function displayEvents(events) {
    const eventsList = document.getElementById('events-list');
    eventsList.innerHTML = ''; 

    events.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.className = 'event-item';

        // Format the start_datetime
        const formattedDate = new Date(event.start_datetime).toLocaleString('en-US', {
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            second: 'numeric', 
            timeZoneName: 'short'
        });

        eventItem.innerHTML = `
            <h3>${event.title}</h3>
            <p>Description: ${event.description}</p>
            <p>Start Date: ${formattedDate}</p>
            <p>Location: ${event.location}</p>
            <p>Organizer ID: ${event.organizer_id}</p>
            <p>Category: ${event.category}</p>
            <div class="action-buttons">
                <button onclick="updateEvent()">Update</button>
                <button onclick="deleteEvent('${event.evnt_id}')">Delete</button>
            </div>
        `;
        eventsList.appendChild(eventItem);
    });
}

function updateEvent() {
    // Redirect to update page with the event ID as a query parameter
    window.location.href = `C:/Node js/server7/front_end/event_update/evnt_put.html`;
}

function deleteEvent(evnt_id) {
    fetch(`http://localhost:3002/api/Event/delete_evnt_by_id/${evnt_id}`, {
        method: 'DELETE',
        headers: {
            //'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}` // Include token for auth
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert('Event deleted successfully!');
            document.getElementById('fetch-events').click(); // Refresh the event list
        } else {
            alert('Failed to delete event. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
}
