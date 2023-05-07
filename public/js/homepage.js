// Selectors for title/desc of the post to comment on to show in modal
const commentTitle = $(".currentTitle");
const commentDesc = $(".currentDesc");

let blogId = "";

// Button to activate modal and prompt the user for a comment
$(".comment-button").on("click", async (e) => {
    blogId = e.target.id;
    console.log(blogId);

    // get the response back of the id of the blog clicked, so we can show that in the modal
    const response = await fetch(`/api/users/blogpost/${blogId}`);
    console.log(response);

    // handle the response coming back from the api
    const responseData = await response.json();

    commentTitle.text(responseData.title);
    commentDesc.text(responseData.description);
});

$(".addCommentButton").on("click", async (e) => {
    console.log("Add comment button was clicked");

    console.log(blogId);

    const commentData = {
        description: $(".add-comment").val(),
        blogpost_id: blogId
    };

    // send a request to the comment route
    const response = await fetch('/api/users/comment', {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: {
            "Content-Type": "application/json"
        }
    });

    // deal with the response
    const responseData = await response.json()
    console.log(responseData);


    // on success - reload the page
    if(responseData.success) {
        console.log("New Comment Added!");

        // redirect to the users dashboard where they can create new blogposts
        window.location.reload();
    }
});