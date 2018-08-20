const request = require('supertest')
const app = require('../../app')
const mockUser = require('../mocks').user

process.env.TEST_SUITE = 'usercontroller-test'

describe('UserController', () => {
  test('GET to /api/user/current_user fetches logged in user', async done => {
    request(app)
      .get('/api/user/current_user')
      .end((err, response) => {
        const user = response.body
        expect(user._id.toString()).toEqual(mockUser._id.toString())
        done()
      })
  })

  test('PUT to /api/user updates logged in user', async done => {
    await mockUser.save()

    request(app)
      .put('/api/user')
      .send({ settings: { darkMode: true } })
      .end((err, response) => {
        const user = response.body
        console.log(user)
        expect(user.settings.darkMode).toBe(true)
        done()
      })
  })
})
