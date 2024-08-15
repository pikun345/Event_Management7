document.getElementById('admin-login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const userId = document.getElementById('user_id').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (userId && email && password) {
        try {
            const response = await fetch('http://localhost:3002/api/adminlogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: userId,
                    email: email,
                    password: password,
                })
            });

            if (response.ok) {
                const data = await response.json();
                alert('Login successful! Token: ' + data.token);
                localStorage.setItem('adminToken', data.token);

                // Determine which button was clicked and redirect accordingly
                const createEventButtonClicked = event.submitter.classList.contains('Create_Event');
                const manageEventButtonClicked = event.submitter.classList.contains('Manage_Event');

                if (createEventButtonClicked) {
                    window.location.href = 'C:/Node js/server7/front_end/event_create/event .html';
                } else if (manageEventButtonClicked) {
                    window.location.href = 'C:/Node js/server7/front_end/event_Dashboard/evnt_dash.html';
                }

            } else {
                const errorData = await response.json();
                alert('Login failed: ' + errorData.message);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Network error occurred. Please try again later.');
        }
    } else {
        alert('Please fill in all fields.');
    }
});

document.getElementById('book-event-button').addEventListener('click', function(event) {
    event.preventDefault();

    const userId = document.getElementById('user_id').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (userId && email && password) {
        
        window.location.href = 'C:/Node js/server7/front_end/evnt_discover/evnt_discover.html';
    } else {
        alert('Please fill in all fields.');
    }
});
