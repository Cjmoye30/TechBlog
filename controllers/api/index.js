const router = require('express').Router();
const userRoutes = require('./user-routes')

// Everything that h
router.use('/users', userRoutes);

module.exports = router;

