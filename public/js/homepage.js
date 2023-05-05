// Selectors for title/desc of the post to comment on to show in modal
const commentTitle = $(".currentTitle"); 
const commentDesc = $(".currentDesc"); 

// Button to activate modal and prompt the user for a comment
$(".comment-button").on("click", async (e) => {
    const blogId = e.target.id;
    console.log(blogId);

    const response = await fetch(`/api/users/blogpost/${blogId}`);
    console.log(response);

    // handle the response coming back from the api
    const responseData = await response.json();

    commentTitle.text(responseData.title);
    commentDesc.text(responseData.description);
});

$(".addCommentButton").on("click", async () => {
    console.log("Add comment button was clicked")
});