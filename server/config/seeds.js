const db = require("./connection");
const { User } = require("../models");

db.once("open", async () => {
  await User.deleteMany();
  await User.create(
    {
      email: "Kevin@email.com",
      password: "password123",
      profile: {
        firstName: "Kevin",
        lastName: "Hernandez",
        age: 26,
        location: "San Luis Obispo, CA",
        job: "Full Stack Developer",
        gender: "He/His",
        interest: [
          "🍬 Reese's",
        ],
        github: "kh288",
        linkedin: "kevin-hernandez-5a8243167",
        images: [
          "http://res.cloudinary.com/dhuyyu7wp/image/upload/v1662224852/euwxtwd5ivznn1zmsxw6.jpg",
          "https://res.cloudinary.com/dhuyyu7wp/image/upload/v1662224970/yl9u0ajzcsuldqmamgee.jpg",
          "https://res.cloudinary.com/dhuyyu7wp/image/upload/v1662224966/pfomzgojlo7qw8ottisl.webp",
          "https://res.cloudinary.com/dhuyyu7wp/image/upload/v1662225023/cv5rhjyybv62hlfzicab.jpg",
          "https://res.cloudinary.com/dhuyyu7wp/image/upload/v1662225027/ipusaase1gcc4k3rh5vt.jpg"
        ],
        aboutme: "Hi! I'm Kevin. I'm a full stack developer, TA, and Reese's-lover.",
        seeking: "She/Her",
        range: [21, 30]
      },
    },
    {
      email: "reeses@email.com",
      password: "password123",
      profile: {
        firstName: "Reese's",
        lastName: "Cup",
        age: 94,
        location: "Hershey, PA",
        job: "Candy",
        gender: "She/Her",
        interest: [
          "🍬 chocolate",
          "☕ peanut butter",
        ],
        github: "hershey-chocolate",
        linkedin: "the-hershey-company",
        images: [
          "https://res.cloudinary.com/dhuyyu7wp/image/upload/v1662225027/ipusaase1gcc4k3rh5vt.jpg",
          "http://res.cloudinary.com/dhuyyu7wp/image/upload/v1662002913/jksleisc78qcnekcrl8k.jpg",
          "http://res.cloudinary.com/dhuyyu7wp/image/upload/v1662002913/c9xzmqkd1qufcsb913no.jpg",
          "http://res.cloudinary.com/dhuyyu7wp/image/upload/v1662002913/qkxgy1m3ocwvw9fghmza.jpg",
          "http://res.cloudinary.com/dhuyyu7wp/image/upload/v1662002914/alooofgr267tssynv0xq.png",
          "http://res.cloudinary.com/dhuyyu7wp/image/upload/v1662002914/b3f5wo7ybldszidvitv5.jpg",
          "http://res.cloudinary.com/dhuyyu7wp/image/upload/v1662002914/tztmnb07cvgyqlawbl9g.jpg",
          "http://res.cloudinary.com/dhuyyu7wp/image/upload/v1662002914/h2j8xwoynzvqmyyjueez.webp",
          "http://res.cloudinary.com/dhuyyu7wp/image/upload/v1662002914/hlb8vu3ilda55uxief3e.jpg",
          "http://res.cloudinary.com/dhuyyu7wp/image/upload/v1662002914/nvjwzbyqzeebeowzsbor.webp",
          "http://res.cloudinary.com/dhuyyu7wp/image/upload/v1662002914/rfqdgq4cfkglpxdauuul.jpg",
          "http://res.cloudinary.com/dhuyyu7wp/image/upload/v1662002914/zhy26gu2q5ptrtwdeqbb.jpg",
          "http://res.cloudinary.com/dhuyyu7wp/image/upload/v1662002915/zxfayjb1fq8t9kevfthp.jpg",
        ],
        aboutme: "I'm a Reese's peanut butter cup.",
        seeking: "He/His",
        range: [70, 100]
      },
    },
    {
      email: "test1@email.com",
      password: "password123",
      profile: {
        firstName: "Danaerys",
        lastName: "Targaryen",
        age: 22,
        location: "Westeros",
        job: "Queen",
        gender: "She/Her",
        interest: [
          "🐉 dragons",
          "🐉 dragons",
          "🐉 more dragons",
          "🔥 fire",
          "🤪 losing my mind",
        ],
        github: "StarryBlue7",
        linkedin: "vince-lee",
        images: [
          "https://res.cloudinary.com/dhuyyu7wp/image/upload/v1662513287/fwcgrergwdg6iupw5z5u.webp"
        ],
        aboutme: "I will disappoint you.",
        seeking: "He/Him",
        range: [21, 25]
      },
    },
    {
      email: "test2@email.com",
      password: "password123",
      profile: {
        firstName: "Frodo",
        lastName: "Baggins",
        age: 25,
        location: "Bag End",
        job: "Ringbearer",
        gender: "He/Him",
        interest: [
          "🍴 food",
          "🍺 beer",
          "💍 the One Ring",
        ],
        github: "StarryBlue7",
        linkedin: "vince-lee",
        images: [
          "https://res.cloudinary.com/dhuyyu7wp/image/upload/v1662513281/r77k98w2sf6mddfsveiq.jpg"
        ],
        aboutme: "I have to save the world.",
        seeking: "She/Her",
        range: [21, 25]
      },
    },
    {
      email: "test4@email.com",
      password: "password123",
      profile: {
        firstName: "Elizabeth",
        lastName: "Holmes",
        age: 38,
        location: "Prison",
        job: "Former CEO",
        gender: "She/Her",
        interest: [
          "🩸 Fake blood testing technology",
          "💻 wire fraud",
          "💵 conspiracy",
        ],
        github: "StarryBlue7",
        linkedin: "vince-lee",
        images: [
          "https://res.cloudinary.com/dhuyyu7wp/image/upload/v1662513284/zbbukopgzkpozxryv2lw.jpg"
        ],
        aboutme: "I'm like to defraud investors.",
        seeking: "She/Her",
        range: [21, 25]
      },
    },
    {
      email: "test3@email.com",
      password: "password123",
      profile: {
        firstName: "Harry",
        lastName: "Potter",
        age: 18,
        location: "Hogwarts",
        job: "Student",
        gender: "He/Him",
        interest: [
          "🪄 magic",
          "🧹 quidditch",
          "🏰 Hogwarts ",
        ],
        github: "StarryBlue7",
        linkedin: "vince-lee",
        images: [
          "https://res.cloudinary.com/dhuyyu7wp/image/upload/v1662513277/iosjwblfbcd7rsmosgie.jpg"
        ],
        aboutme: "I'm a teenage wizard.",
        seeking: "She/Her",
        range: [21, 25]
      },
    }
  );
  console.log("Seeds have been seeded");
  process.exit();
});
