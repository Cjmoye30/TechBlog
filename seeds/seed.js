const { User } = require('../models');
const { Blogposts} = require('../models');

const sequelize = require('../config/connection');

const userData = require('./userData.json');
const blogData = require('./blogpostData.json');

const seedDatabase = async () => {

  // Sync the database
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- User Table Seeded -----\n');


  await Blogposts.bulkCreate(blogData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- User Table Seeded -----\n');

  process.exit(0);
};

seedDatabase();
