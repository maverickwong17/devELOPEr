const db = require('./connection');
const { User } = require('../models');

db.once('open', async () => {
    await User.deleteMany();
    await User.create(
        {
            email: 'test@email.com',
            password: 'password123',
            firstName: "Vince",
            lastName: "Lee",
            age: 22,
            city: "Berkeley, CA",
            job: 'Full Stack Developer',
            interests: [
                '🍬 black licorice',
                '☕ Earl Gray tea',
                '🐿️ squirrels',
                '🦊 having too many tabs open',
                '🖥️ using one monitor'
            ]
        },
        {
            email: 'testing@email.com',
            password: 'pass1234',
            firstName: "Kevin",
            lastName: "Hernandez",
            age: 22,
            city: "San Luis Obispo, CA",
            job: 'Full Stack Developer',
            interests: [
                "🍬 Reese's"
            ]
        }
    )
    console.log('Vince and Kevin have been seeded')
    process.exit();
});