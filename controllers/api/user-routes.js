const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Blogposts, Comments } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/login', async (req, res) => {
    console.log("POST request hit!")
    try {

        // get the response body (the object we created)back from the login.js form when submitted
        console.log("Request body from user-routes:", req.body);

        // check first to see if the users email is in our db - if it is then proceed to the password, if not then throw an error

        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        console.log(userData);

        // using if(userData) - meaning we are checking to see if we get anything back, then we are going to check for the password, otherwise we will throw an error saying that user does not exist.

        if (userData) {
            console.log("That user is in the DB - checking for the password now")

            // checking for password through the bcrypt
            const match = await bcrypt.compare(req.body.password, userData.password);
            if (match) {
                req.session.save(() => {
                    req.session.user_id = userData.id;
                    req.session.name = userData.name;
                    req.session.logged_in = true;

                    res.json({
                        success: true,
                        user: userData,
                        message: 'You are now logged in!'
                    });
                });

                console.log(req.session.logged_in)

            } else {
                return res.status(400).json("Password was incorrect!")
            }

        } else {
            return res.status(400), json("That user does not exist in our DB - please create an account to access these features.")
        }

    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// Create a new user
router.post('/signup', async (req, res) => {
    const signupData = req.body;
    console.log(signupData);

    try {
        // Create the user based on the request body sent over
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        // sign-in the user 
        req.session.save(() => {
            req.session.user_id = newUser.id,
                req.session.name = newUser.name,
                req.session.logged_in = true;

                res.json({
                    success: true,
                    user: newUser,
                    message: 'You are now logged in!'
                });
            });
            

    } catch (err) {
        res.status(500).json(err)
    }

});

// Create a new Blogpost
router.post('/blogpost', async (req, res) => {
    console.log("POST request to create a new blogpost was hit!");

    const newBlogData = req.body;
    console.log(newBlogData);

    const newPost = await Blogposts.create({
        title: req.body.title,
        description: req.body.description,
        author_id: req.session.user_id
    });

    console.log("New post created!");

    req.session.save(() => {

        res.json({
            success: true,
            user: newPost,
            message: 'New post created!'
        });
    });
});

// Get an existing blogpost by the ID passed in from a button click
router.get('/blogpost/:id', withAuth, async (req, res) => {

    try {
        const blogData = await Blogposts.findByPk(req.params.id);

        const blog = blogData.toJSON();

        const blogObj = {
            id: blog.id,
            title: blog.title,
            description: blog.description
        }

        console.log(blogObj);
        res.json(blogObj);

    } catch (err) {
        res.status(500).json(err)
    }
});
// Get existing commend by ID to pass into update comment modal
router.get('/comment/:id', async (req, res) => {

    try {
        const commentData = await Comments.findByPk(req.params.id);

        const comment = commentData.toJSON();

        console.log(comment);
        res.json(comment);

    } catch (err) {
        res.status(500).json(err)
    }
});

// UPDATE blogpost
router.put('/blogpost/:id', async (req, res) => {

    try {
        const blogData = await Blogposts.update(req.body, {
            where: {
                id: req.body.id
            }
        })

        req.session.save(() => {
            res.json({
                success: true,
                data: blogData,
                message: 'New post created!'
            });
        });

    } catch (err) {
        res.status(500).json(err)
    }

});

// UPDATE comment
router.put('/comment/:id', async (req, res) => {

    try {
        const commentData = await Comments.update(req.body, {
            where: {
                id: req.body.id
            }
        })

        req.session.save(() => {
            res.json({
                success: true,
                data: commentData,
                message: 'Comment Updated!'
            });
        });

    } catch (err) {
        res.status(500).json(err)
    }

});


// Comment on a blogpost
router.post('/comment', async (req, res) => {
    try {
        const newComment = await Comments.create({
            blogpost_id: req.body.blogpost_id,
            description: req.body.description,
            author_id: req.session.user_id
        });
        req.session.save(() => {
            res.json({
                success: true,
                data: newComment,
                message: 'New comment added!'
            });
        });

    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE post
router.delete('/blogpost/:id', async (req, res) => {
    try {
        const blogData = await Blogposts.destroy({
          where: {
            id: req.params.id,
          },
        });
    
        if (!blogData) {
          res.status(404).json({ message: 'No blog found with this id!' });
          return;
        }
    
        res.status(200).json(blogData);
      } catch (err) {
        res.status(500).json(err);
      }
});

// DELETE Comment
router.delete('/comment/:id', async (req, res) => {
    try {
        const commentData = await Comments.destroy({
          where: {
            id: req.params.id,
          },
        });
    
        if (!commentData) {
          res.status(404).json({ message: 'No comment found with this id!' });
          return;
        }
    
        res.status(200).json(commentData);
      } catch (err) {
        res.status(500).json(err);
      }
})

module.exports = router;