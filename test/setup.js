// https://medium.com/@art.longbottom.jr/concurrent-testing-with-mongoose-and-jest-83a27ceb87ee

const mongoose = require('mongoose')

beforeEach(done => {
  function clearDB() {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(function() {})
    }
    return done()
  }

  if (mongoose.connection.readyState === 0) {
    mongoose.connect(
      `mongodb://localhost:27017/unit_${process.env.TEST_SUITE}`, // <------- IMPORTANT
      function(err) {
        if (err) {
          throw err
        }

        return clearDB()
      }
    )
  } else {
    return clearDB()
  }
})

afterEach(done => {
  mongoose.disconnect()
  return done()
})

afterAll(done => {
  return done()
})
