const blogTitle = $("#blog-title");
const blogDesc = $("#blog-desc");

$(".new-blog-form").on("submit", async (e) => {
    e.preventDefault();

    try {
        // create an object to store the data input from the user
        const newBlogData = {
            title: blogTitle.val(),
            description: blogDesc.val()
        };
        console.log(newBlogData)

        // send a response to the user
        const response = await fetch('/api/users/blogpost', {
            method: "POST",
            body: JSON.stringify(newBlogData),
            headers: {
                "Content-Type": "application/json"
            }
        })

        console.log(response);

        // handle the response coming back from the api
        const responseData = await response.json();
        console.log(responseData);

        if (responseData.success) {
            console.log("New post created!");
            window.location.reload();
        } else {
            console.log("Something went wrong! Try again!")
        }

    } catch (err) {
        console.log(err);
    }
});

// Accessing the modal
$(".edit-button").on("click", async (e) => {
    console.log("Edit button was clicked!");

    const blogId = e.target.id;
    console.log(blogId);

    const response = await fetch(`/api/users/blogpost/${blogId}`);
    console.log(response);

    // handle the response coming back from the api
    const responseData = await response.json();
    console.log(responseData.description);

    // send this over to the modal?
    // make the model text fields editable by default

    // on click, we would then have to call the dashboard page again and it will render with the data we pass into it?

    $(".update-title").attr("placeholder", responseData.title)
    $(".update-desc").attr("placeholder", responseData.description)
    
});

//   take the data we are getting from the response and send that to the template with the modul