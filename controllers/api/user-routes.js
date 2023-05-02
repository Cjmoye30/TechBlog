const router = require('express').Router();


router.post('/login', async (req, res) => {
    console.log("POST request hit!")
    try {
        console.log(req.body);
        res.status(200).json("POST request was hit")
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;