const User = require('./User');
const Blogposts = require('./blogposts');

// User can have many blogposts
User.hasMany(Blogposts, {
    foreignKey: 'author_id'
})

// Blogposts can only have 1 user
Blogposts.belongsTo(User, {
    foreignKey: 'author_id'
});

module.exports = { User, Blogposts};