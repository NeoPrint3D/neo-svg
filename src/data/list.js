// import module faker
import faker from 'faker';
var people = [];
for (var i = 0; i < 10; i++) {
    people.push(
        {
        id: i,
        name: faker.name.findName(),
        email: faker.internet.email(),
        profilePic: `https://source.unsplash.com/random/300x300?${i}`,
        status: Math.floor(Math.random()*2) ? true : false,

    });
}


export default people;

