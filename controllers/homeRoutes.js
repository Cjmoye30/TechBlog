const router = require('express').Router();
const { User } = require('../models');
const Blogposts = require('../models/blogposts');

// Get route for homepage - getting all blogposts in the database
// TODO - filter down to 3 with a handlebars helper
router.get('/', async (req, res) => {
try {

  const blogData = await Blogposts.findAll({
    include: [
      {
        model: User,
        attributes: ['name'],
      }
    ]
  });
  console.log("-----------------blog data")
  console.log(blogData);

  // Map the data in order to get a new array with only the needed info - i.e. - only the information that is posted in the database and eliminating any of the promise data

  const blogArr = blogData.map((blogData) => blogData.get({ plain: true }));
  console.log("-----------------blog array")
  console.log(blogArr);

  // Sending the data to the homepage
  res.render('homepage', {blogArr});

  // Catch error
} catch (err) {
  res.status(500).json(err);
}

});

// Get route for login screen
router.get('/login', async (req, res) => {
  res.render('login');
})

// Get route for sign-up screen - Optional

// Get route for dashboard by the user ID
router.get('/dashboard/:id', async (req, res) => {
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

      const userArray = userData.get({ plain: true });
      // console.log(userArray);

      res.render('dashboard', { userArray })

  } catch (err) {
      res.status(500).json(err)
  }

});

module.exports = router;
