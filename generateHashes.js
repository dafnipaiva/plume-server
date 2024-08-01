const bcrypt = require('bcrypt');

const users = [
  { username: 'adnan', password: 'langara' },
  { username: 'dafni', password: 'langara' },
  { username: 'camila', password: 'langara' }
];

async function generateHashedPasswords(users) {
  const saltRounds = 10;

  for (let user of users) {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    console.log(`Username: ${user.username}, Hashed Password: ${hashedPassword}`);
  }
}

generateHashedPasswords(users);
