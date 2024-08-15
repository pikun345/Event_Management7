document.getElementById('ticketForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const ticket = {
        ticket_id: document.getElementById('ticket_id').value,
        evnt_id: document.getElementById('evnt_id').value,
        user_id: document.getElementById('user_id').value,
        ticket_type: document.getElementById('ticket_type').value,
        price: document.getElementById('price').value,
        purchase_date: document.getElementById('purchase_date').value,
    };

    console.log('Ticket registered:', ticket);

    // Here you would typically send the ticket data to the server using AJAX or fetch.
    // Example: 
    // fetch('/api/register_ticket', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(ticket),
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log('Success:', data);
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    // });

    // Reset form after submission
    document.getElementById('ticketForm').reset();
});
