// Query Selectors to create a new blogpost
const blogTitle = $("#blog-title");
const blogDesc = $("#blog-desc");

// Query Selectors to update a blog post
const updateBlogTitle = $("#blog-title-update");
const updateBlogDesc = $("#blog-desc-update");

// Access the active blog id in modal after click event on edit button
let blogId = "";

// Submit new blog event handler
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

// Retrieve modal event handler - populate with existing title/description
$(".edit-button").on("click", async (e) => {
    console.log("Edit button was clicked!");

    blogId = e.target.id;
    console.log(blogId);

    const response = await fetch(`/api/users/blogpost/${blogId}`);
    console.log(response);

    // handle the response coming back from the api
    const responseData = await response.json();
    console.log(responseData.description);

    // send this over to the modal?
    // make the model text fields editable by default

    // on click, we would then have to call the dashboard page again and it will render with the data we pass into it?

    $(".update-title").attr("placeholder", responseData.title);
    $(".update-desc").attr("placeholder", responseData.description);

});

// click event for the modal submit button to perform a put reques to update the blogpost with the same id
$(".updateBlogButton").on("click", async () => {
    console.log("update blog button clicked!");

    try {

        const updateBlog = {
            id: blogId,
            title: updateBlogTitle.val(),
            description: updateBlogDesc.val()
        };

        // send a response to the user
        const response = await fetch(`/api/users/blogpost/${blogId}`, {
            method: "PUT",
            body: JSON.stringify(updateBlog),
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log(response);

        // handle the response coming back from the api
        const responseData = await response.json();
        console.log(responseData);

        if (responseData.success) {
            console.log("Post updated!");
            // reload the page to show the new post
            window.location.reload();
        } else {
            console.log("Something went wrong! Try again!")
        }

    } catch (err) {
        console.log(err)
    }
});

// Delete post event listener
$(".delete-button").on("click", async (e) => {
    blogId = e.target.id;
    console.log(`Request to delete post of ${blogId} hit!`);

    // send a response to the API
    const response = await fetch(`/api/users/blogpost/${blogId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        window.location.reload();
    } else {
        console.log("Something went wrong")
    }
});
