const router = require('express').Router();
const { User, Blogposts, Comments } = require('../models');
const withAuth = require('../utils/auth');


// Get route for homepage - getting all blogposts in the database
// TODO - filter down to 3 with a handlebars helper
router.get('/', async (req, res) => {
  try {

    const blogData = await Blogposts.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comments,
          include: [
            {
              model: User,
              attributes: ['name']
            }
          ]
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
    res.render('homepage', { blogArr });

    // Catch error
  } catch (err) {
    res.status(500).json(err);
  }

});

// get blog by single id
router.get('/homepage/:id', async (req, res) => {
  console.log("fix homepage for only post:", req.params.id);

  try {
    const blogData = await Blogposts.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comments,
          include: [
            {
              model: User,
              attributes: ['name']
            }
          ]
        }
      ]
    });
    console.log(blogData);

    const blogJson = blogData.toJSON();
    console.log("-----------------blog json")
    console.log(blogJson);
    res.render('singlePostHomepage', blogJson)

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }

});

// Get route for login screen
router.get('/login', async (req, res) => {
  res.render('login');
})

// Get route for sign-up screen - Optional
router.get('/signup', async (req, res) => {
  res.render('signup');
});

// Get route for dashboard by the user ID from the session.user.id
router.get('/dashboard', withAuth, async (req, res) => {
  console.log("GET request for the dashboard page by author_id!");

  try {
        //  we are creating a new variable to take all of the raw data from our User table where the id is equal to the session.user.id
        const userData = await Blogposts.findAll({
          where: {
            author_id: req.session.user_id
          },
          include: [
            {
                model: User,
                attributes: ['name'],
            },
        ]
        });

        const commentData = await Comments.findAll({
          where: {
            author_id: req.session.user_id
          },
          include: [
            {
              model: Blogposts,
              attributes: ['title'],
            }
          ]
        });

   
        // Converting the userData into an object we can pass into our handlebars template
        const userArray = userData.map(userData => userData.toJSON());
        const commentArray = commentData.map(commentData => commentData.toJSON());
        console.log("USER DATA -----------")
        console.log(userArray);
        console.log("COMMENT DATA -----------")
        console.log(commentArray)
    
        // render the dashboard for the current user that just logged in with the new array we got from the map function
        res.render('dashboard', {userArray, commentArray});
    
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }  
});

router.get('/blogpost/:id', async (req, res) => {

  try {
    const blogData = await Blogposts.findByPk({
      where: {
        id: req.params.id
      }
    });

    const blog = blogData.map(blogData => blogData.toJSON());
    console.log(blog);

    
  } catch (err) {
    res.status(500).json(err)

  }

})

module.exports = router;
