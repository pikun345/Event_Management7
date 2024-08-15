document.getElementById('event-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Gather the form data
    const evnt_id = document.getElementById('evnt_id').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const start_datetime = document.getElementById('start_datetime').value;
    const location = document.getElementById('location').value;
    const organizer_id = document.getElementById('organizer_id').value;
    const ticket_info = document.getElementById('ticket_info').value;
    const category = document.getElementById('category').value;

    // Create the event object
    const eventData = {
        evnt_id,
        title,
        description,
        start_datetime,
        location,
        organizer_id,
        ticket_info,
        category
    };

    // Retrieve the admin token from localStorage
    const adminToken = localStorage.getItem('adminToken');

    if (adminToken) {
        // Make the API request to create the event
        fetch('http://localhost:3002/api/Event/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminToken}` // Include admin token here
            },
            body: JSON.stringify(eventData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Event created successfully!');
            // Optionally, redirect to another page or clear the form
            document.getElementById('event-form').reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to create event. Please try again.');
        });
    } else {
        alert('Admin token is missing. Please log in again.');
    }
});
