const router = require('express').Router();
const { User } = require('../models');
const Blogposts = require('../models/blogposts');

// Dispaly all of the blogposts
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
  console.log(blogData);

  // Map the data in order to get a new array with only the needed info - i.e. - only the information that is posted in the database and eliminating any of the promise data

  const blogArr = blogData.map((i) => i.toJSON());
  console.log(blogArr);

  // Sending the data to the homepage
  res.render('homepage', {blogArr});

  // Catch error
} catch (err) {
  res.status(500),json(err);
}

});

module.exports = router;
