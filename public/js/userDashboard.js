// Query Selectors to create a new blogpost
const blogTitle = $("#blog-title");
const blogDesc = $("#blog-desc");

// Query Selectors to update a blog post
const updateBlogTitle = $("#blog-title-update");
const updateBlogDesc = $("#blog-desc-update");

// Access the active blog id in modal after click event on edit button
let blogId = "";
let commentId = "";

// Submit new blog event handler
$(".new-blog-form").on("submit", async (e) => {
    e.preventDefault();

    try {
        // create an object to store the data input from the user
        const newBlogData = {
            title: blogTitle.val(),
            description: blogDesc.val()
        };

        // send a response to the user
        const response = await fetch('/api/users/blogpost', {
            method: "POST",
            body: JSON.stringify(newBlogData),
            headers: {
                "Content-Type": "application/json"
            }
        })

        // handle the response coming back from the api
        const responseData = await response.json();
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

    $(".update-title").val(responseData.title);
    $(".update-desc").text(responseData.description);

});

// click event for the modal submit button to perform a put reques to update the blogpost with the same id
$(".updateBlogButton").on("click", async () => {
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

// External link to go to the dashboard for to view the blog the user commented on
$(".link-button").on("click", async (e) => {
    window.location.replace(`homepage/${e.target.id}`)
})

$(".comment-delete-button").on("click", async (e) => {
    console.log(e.target.id);

    const response = await fetch(`/api/users/comment/${e.target.id}`, {
        method: "DELETE",
    });

    if (response.ok) {
        window.location.reload();
    } else {
        console.log("Something went wrong")
    }
})

$(".comment-edit-button").on("click", async (e) => {
    commentId = e.target.id

    const response = await fetch(`/api/users/comment/${commentId}`)
    console.log(response);

    const responseData = await response.json();
    console.log(responseData.description);

    $(".update-comment").text(responseData.description);
})

$(".updateCommentButton").on("click", async (e) => {
    try {

        const updateComment = {
            id: commentId,
            description: $("#blog-desc-comment").val()
        };

        // send a response to the user
        const response = await fetch(`/api/users/comment/${commentId}`, {
            method: "PUT",
            body: JSON.stringify(updateComment),
            headers: {
                "Content-Type": "application/json"
            }
        });

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

})