document.getElementById('purchase-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const ticketId = document.getElementById('ticket_id').value;
    const evntId = document.getElementById('evnt_id').value;
    const userId = document.getElementById('user_id').value;
    const ticketType = document.getElementById('ticket_type').value;
    const price = document.getElementById('price').value;
    const purchase_dt = document.getElementById('purchase_date').value;

    try {
        const response = await fetch('http://localhost:3002/api/purchase_ticket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ticket_id: ticketId,
                evnt_id: evntId,
                user_id: userId,
                ticket_type: ticketType,
                price: price,
                purchase_date: purchase_dt
            })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('message2').textContent = 'Ticket purchased successfully!';
        } else {
            document.getElementById('message2').textContent = 'Failed to purchase ticket: ' + data;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message2').textContent = 'Network error occurred. Please try again later.';
    }
});

document.getElementById('cancel-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const ticketId = document.getElementById('cancel_ticket_id').value;

    try {
        const response = await fetch(`http://localhost:3002/api/cancel_ticket/${ticketId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('message2').textContent = data.message || 'Ticket canceled successfully!';
        } else {
            document.getElementById('message2').textContent = 'Failed to cancel ticket: ' + (data.message || 'Unknown error');
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message2').textContent = 'Network error occurred. Please try again later.';
    }
});

document.getElementById('ticket_type').addEventListener('change', function() {
    const ticketType = this.value;
    const priceInput = document.getElementById('price');

    if (ticketType === 'VIP') {
        priceInput.value = 250;
    } else if (ticketType === 'General') {
        priceInput.value = 150;
    } else {
        priceInput.value = '';
    }
});
