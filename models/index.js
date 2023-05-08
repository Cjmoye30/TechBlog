const User = require('./User');
const Blogposts = require('./blogposts');
const Comments = require('./comments');

// User can have many blogposts
User.hasMany(Blogposts, {
    foreignKey: 'author_id'
})

// Blogposts can only have 1 user
Blogposts.belongsTo(User, {
    foreignKey: 'author_id'
});

// Blogposts can have many comments
Blogposts.hasMany(Comments, {
    foreignKey: 'blogpost_id',
});

//comments can only have 1 author
Comments.belongsTo(User, {
    foreignKey: 'author_id'
});

// associate blogposts to comments
Comments.belongsTo(Blogposts, {
    foreignKey: 'blogpost_id'
})

module.exports = { User, Blogposts, Comments };