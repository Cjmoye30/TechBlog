const router = require('express').Router();
const Blogposts = require('../models/blogposts');
const User = require('../models/User');

// Get all blogposts by the user that is logged in and have them displayed on the page for them to present - finding all by user_id
// The user can also add a blogpost from this page

// router.get('/:id', async (req, res) => {
//     console.log("GET request for the dashboard page by author_id!")
//     try {

//         const blogData = await Blogposts.findAll({
//             where: [
//                 {
//                     author_id: req.params.id
//                 }
//             ],

//             include: [
//                 {
//                   model: User,
//                   attributes: ['name'],
//                 }
//               ]

//         });

//         const blogArr = blogData.map((i) => i.toJSON());
//         console.log(blogArr);

//         res.render('dashboard', blogArr[0]);

//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// Get all users in DB
// router.get('/', async (req, res) => {
//     try {
//         const userData = await User.findAll();

//         const userArr = userData.map((i) => i.toJSON());
//         console.log(userArr);

//         res.render('dashboard', { userArr });

//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// Only get 1
router.get('/:id', async (req, res) => {
    console.log("GET request for the dashboard page by author_id!");

    try {
        const userData = await User.findByPk(req.params.id, {
            include: [
                {
                  model: Blogposts,
                  attributes: ['title', 'description'],
                }
              ]
        });
        // console.log(userData);

        // update the data
        const userArray = userData.get({ plain: true });
        console.log(userArray);

        res.render('dashboard', { userArray })

    } catch (err) {
        res.status(500).json(err)
    }

});

module.exports = router;
