// Create the variables for the input fields we are needing to keep track of
const nameSignup = $("#name-signup");
const emailSignup = $("#email-signup");
const passwordSignup = $("#password-signup");

// Event listener placed on the login form to track submissions
$(".signup-form").on("submit", async (e) => {

    try {

        const signupData = {
            name: nameSignup.val(),
            email: emailSignup.val(),
            password: passwordSignup.val()
        };
    
        console.log("Signup Data sent by user:")
        console.log(signupData);
    
        // Send a resopne to the post request
        const response = await fetch('/api/users/signup', {
            method: "POST",
            body: JSON.stringify(signupData),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const responseData = await response.json();
        console.log("Response Data:",responseData);

        if(responseData.success) {
            console.log("You are now signed in and being redirected to your dashboard where you can create your own blogposts!");
            window.location.replace('/dashboard')
        } else {
            console.log("Something went wrong! Try again!")
        }

    } catch (err) {
        console.log(err)
    }
});