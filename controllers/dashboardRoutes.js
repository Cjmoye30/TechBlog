const router = require('express').Router();
const Blogposts = require('../models/blogposts');
const User = require('../models/User');
const Comments = require('../models/comments')

// Get all blogposts by the user that is logged in and have them displayed on the page for them to present - finding all by user_id
// The user can also add a blogpost from this page


// GET request for all blogs by the user who is logged in
router.get('/:id', async (req, res) => {
    console.log("GET request for the dashboard page by author_id!");

    try {
        const userData = await User.findByPk(req.params.id, {
            include: [
                {
                  model: Blogposts,
                  attributes: ['title', 'description'],
                },
              ]    
        });

        const userArray = userData.get({ plain: true });
        console.log(userArray);
        console.log("hello?")

        res.render('dashboard', { userArray })

    } catch (err) {
        res.status(500).json(err)
    }

});

// POST route for a new blogpost
router.post(':id', async (req, res) => {
    console.log("POST route to create a new blog was hit!")

    try {
        const newPost = await Blogposts.create(req.body);
        res.status(200).json("A new post should be added!")
        // res.status(200).json(newPost)
    } catch (err) {
        res.status(500).json(err)
    }
    }
);

module.exports = router;
