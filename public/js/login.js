// Once the user logs in, then console.log their req.seesion.user_id in a variable
// use that session id to then redirect the to their dashboard
console.log("login.js connected!");

// Event listener added to the form and to keep track of the data inputs

$(".login-form").on("submit", async (e) => {

    try {

        e.preventDefault();

        console.log("Submit form button was hit!");
    
        // creating an object for the login data from the email and password fields we are targeting with JQuery
        const loginData = {
            email: $("#email-login").val(),
            password: $("#password-login").val()
        };
    
        // Send/POST the data to our endpoint so that it can be tested
        const response = await fetch('/api/users/login', {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                "Content-Type": "application/json"
            }
        });
    
        // deal with the response
        const responseData = await response.json()
        console.log(responseData);
    
        if(responseData.success) {
            console.log("You are successfully logged in!");
    
            // redirect to the users dashboard where they can create new blogposts
            window.location.replace('/dashboard');
        }

    } catch (err) {
        console.log(err)
    }
});
