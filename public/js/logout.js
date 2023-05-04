alert("Logout.js is connected!")
const logoutButton = $(".logoutBtn");


logoutButton.click(async (event) => {
    console.log('Logout button clicked!')
    const response = await fetch('/api/users/logout', {
        method: 'POST'
    });

    if (response.ok) {
        window.location.replace('/');
    }
})