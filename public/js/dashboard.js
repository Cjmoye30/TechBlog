$(".newBlogButton").click(function(e){
    e.prevent.default();
    
    alert("Submit button clicked!");
    createPost();
});

const createPost = async (e) => {
    e.prevent.default();

    // Create variables needed for the post request which match up with our table
    const title = $('#blog-title').value.trim();
    const description = $('#blog-desc').value.trim();

    // If both a title and description are entered, proceed with the post request
    if (title && description) {
        const response = await fetch('/dashboardRoutes', {
            method: 'POST',
            body: JSON.stringify({ title, description }),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            console.log("Blog Created");
          } else {
            console.log('Failed to create blog');
          }
    }
};