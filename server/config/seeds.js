const db = require("./connection");
const { User } = require("../models");

db.once("open", async () => {
  await User.deleteMany();
  await User.create(
  {
    email: "squirrels@email.com",
    password: "password123",
    profile: {
      firstName: "Vince",
      lastName: "Lee",
      age: 22,
      location: "Berkeley, CA",
      job: "Full Stack Developer",
      gender: "he/his",
      interest: [
        "🍬 black licorice",
        "☕ Earl Gray tea",
        "🐿️ squirrels",
        "🦊 having too many tabs open",
        "🖥️ using one monitor",
      ],
      github: "StarryBlue7",
      linkedin: "vince-lee",
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
      aboutme: "My name is Vince. Check my interests to see what I love most in the world.",
      seeking: "She/Her",
      range: [21,25]
    },
  },
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
      range: [21,30]
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
      github: "StarryBlue7",
      linkedin: "vince-lee",
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
      aboutme: "My name is Vince. Check my interests to see what I love most in the world.",
      seeking: "He/His",
      range: [25,33]
    },
  });
  console.log("Vince, Kevin, and Reese's have been seeded");
  process.exit();
});
