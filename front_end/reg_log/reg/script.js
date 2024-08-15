document.getElementById('auth-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    // Gather form data
    const userId = document.getElementById('user_id').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const ph = document.getElementById('ph').value;
    const password = document.getElementById('password').value;
    const socialLoginId = document.getElementById('social_login_id').value;
    const socialLoginProvider = document.getElementById('social_login_provider').value;
    const role = document.getElementById('role').value;
    //const registrationDate = document.getElementById('registration_date').value;
    const eventType = document.getElementById('event_type').value;
    const notification = document.getElementById('notification').checked;
    const notificationType = document.getElementById('notification_type').value;

    // Check if all required fields are filled
    if (userId && name && email && ph && password && role && eventType) {
        // Prepare data for submission
        const payload = {
            user_id: userId,
            Name: name,
            email: email,
            Ph: ph,
            password: password,
            social_login_id: socialLoginId,
            social_login_provider: socialLoginProvider,
            role: role,
           // registration_date: registrationDate,
            Event_Type: eventType,
            notification: notification,
            notification_type: notificationType
        };

        try {
            // Send data to the backend
            console.log("fetching...")
            const response = await fetch('http://localhost:3002/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            // Handle response
            console.log("response...")

            if (response.ok) {
                const result = await response.json();
                alert('Registration successful: ' + JSON.stringify(result));
            } else {
                const error = await response.text();
                alert('Error: ' + error);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Network error occurred. Please try again later.');
        }
    } else {
        alert('Please fill in all required fields.');
    }
});
