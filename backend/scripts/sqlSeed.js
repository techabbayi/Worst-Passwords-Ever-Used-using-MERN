const { sequelize } = require('../sqlConfig/mysql');
const User = require('../models/sqlUser');
const Entity = require('../models/sqlEntity');
require('../');

async function seed() {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate([
      { name: 'lokeswara', email: 'lokeswara@gmail.com' },
      { name: 'reddy', email: 'reddy@gmail.com' },
    ]);

    await Entity.bulkCreate([
      { title: 'Entity 1', description: 'Created by Lokeswara', created_by: users[0].id },
      { title: 'Entity 2', description: 'Good morning to all', created_by: users[0].id },
      { title: 'Entity 3', description: 'Created by reddy', created_by: users[1].id },
      { title: 'Entity 4', description: 'Welcome to reddy', created_by: users[1].id },
      { title: 'Entity 5', description: 'Join to Kalvium for good placements', created_by: users[0].id }
    ]);

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    process.exit();
  }
}

seed();
