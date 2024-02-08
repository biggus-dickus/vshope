const Bun = require('bun')

const passwords = [Bun.password.hash('test123'), Bun.password.hash('xakep123')]

const demoUsers = [
  {
    firstName: 'Gosha',
    lastName: 'Tapkin',
    email: 'admin@example.com',
    password: '',
    role: 'ADMIN',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    firstName: 'Vasya',
    lastName: 'Pupkinne',
    email: 'user@example.com',
    password: '',
    role: 'USER',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

module.exports = {
  up(queryInterface) {
    return Promise.all(passwords).then((hashed) => {
      demoUsers[0].password = hashed[0]
      demoUsers[1].password = hashed[1]
      return queryInterface.bulkInsert('users', demoUsers)
    })
  },
  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
}
