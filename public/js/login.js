// Once the user logs in, then console.log their req.seesion.user_id in a variable
// use that session id to then redirect the to their dashboard
console.log("login.js connected!");

// Event listener added to the form and to keep track of the data inputs

$(".login-form").on("submit", async (e) => {
    e.preventDefault();

    console.log("Submit form button was hit!");

    // creating an object for the login data from the email and password fields we are targeting with JQuery
    const loginData = {
        email: $("#email-login").val(),
        password: $("#password-login").val()
    };

    // Send/POST the data to our endpoint so that it can be tested
    const response = fetch('/api/users/login', {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
            "Content-Type": "application/json"
        }
    });

    // deal with the response


    console.log(loginData)
});
