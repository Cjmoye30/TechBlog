const router = require('express').Router();
const { json } = require('sequelize');
const Blogposts = require('../models/blogposts');
const User = require('../models/User');

// Get all blogposts by the user that is logged in and have them displayed on the page for them to present - finding all by user_id
// The user can also add a blogpost from this page

router.get('/:id', async (req, res) => {
    console.log("GET request for the dashboard page by author_id!")
    try {
        
        const blogData = await Blogposts.findAll({
            where: [
                {
                    author_id: req.params.id
                }
            ]
        });

        const blogArr = blogData.map((i) => i.toJSON());
        console.log(blogArr);
        
        
    } catch (err) {
        res.status(500), json(err);
    }
});

router.get('/', async (req, res) => {
    console.log("GET request for the dashboard page!")
    
    try {
        res.render('dashboard')
    } catch (err) {
        res.status(500), json(err)
    }

})

module.exports = router;
