const db = require('./connection');
const {User} = require('../models');

db.once('open', async () => {
    await User.deleteMany();
    await User.create({
        username: "VinceLee",
        email: 'test@email.com',
        password: 'password123',
        firstName: "Vince",
        lastName: "Lee",
        age: 22,
        city: "Berkeley, CA",
        job: 'Full Stack Developer',
    })
    console.log('Vince has been seeded')
    process.exit();
});