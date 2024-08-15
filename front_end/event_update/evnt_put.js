document.getElementById('update-event-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const eventData = {
        evnt_id: document.getElementById('evnt_id').value,
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        start_datetime: document.getElementById('start_datetime').value,
        location: document.getElementById('location').value,
        organizer_id: document.getElementById('organizer_id').value,
        ticket_info: JSON.parse(document.getElementById('ticket_info').value),
        category: document.getElementById('category').value
    };

    fetch(`http://localhost:3002/api/Event/update_event_by_id/${eventData.evnt_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(eventData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Event updated successfully") {
            alert('Event updated successfully!');
        } else {
            alert('Failed to update event. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
});
