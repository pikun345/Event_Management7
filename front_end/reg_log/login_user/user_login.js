
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