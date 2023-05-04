alert("dashboard.js connected!")
const blogTitle = $("#blog-title");
const blogDesc = $("#blog-desc");

$(".new-blog-form").on("submit", async (e) => {
    alert("Create button clicked!")
       e.preventDefault();
        const newBlogData = {
            title: blogTitle.val(),
            description: blogDesc.val()
        };
        console.log(newBlogData)
});