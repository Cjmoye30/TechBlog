const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models')



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
                console.log("log tf in");

                req.session.save(() => {
                    req.session.user_id = userData.id;
                    req.session.logged_in = true;

                    res.json({
                        success: true,
                        user: userData,
                        message: 'You are now logged in!'
                    });
                });

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

module.exports = router;