document.getElementById('search-button').addEventListener('click', async function() {
    const eventId = document.getElementById('event-id').value;
    const attendeesList = document.getElementById('attendees-list');
    const message = document.getElementById('message');

    attendeesList.innerHTML = '';
    message.textContent = '';

    if (!eventId) {
        message.textContent = 'Please enter an event ID.';
        return;
    }

    try {
        const response = await fetch(`http://localhost:3002/api/see_attende/${eventId}`);
        const data = await response.json();

        if (response.ok) {
            if (data.length > 0) {
                data.forEach(attendee => {
                    const attendeeCard = document.createElement('div');
                    attendeeCard.className = 'attendee-card';
                    attendeeCard.innerHTML = `
                        <h3>User Name: ${attendee.user_name}</h3>
                        <p><strong>Event Title:</strong> ${attendee.event_title}</p>
                        <p><strong>Location:</strong> ${attendee.event_location}</p>
                    `;
                    attendeesList.appendChild(attendeeCard);
                });
            } else {
                message.textContent = 'No attendees found for this event.';
            }
        } else {
            message.textContent = `Error: ${data.message || 'Unable to fetch attendees.'}`;
        }
    } catch (error) {
        console.error('Error:', error);
        message.textContent = 'Network error occurred. Please try again later.';
    }
});
