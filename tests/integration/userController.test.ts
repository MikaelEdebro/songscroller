import request from 'supertest'
import app from '../../app'
import mockUser from '../mocks/user'
import { User } from '../../models'
import mongoose from 'mongoose'

describe('UserController', () => {
  let db

  beforeAll(async () => {
    db = await mongoose.connect('mongodb://localhost:27017/songscroller-test')
  })

  beforeEach(async () => {
    await User.remove({})
  })

  afterAll(async () => {
    db.close()
  })

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
        expect(user.settings.darkMode).toBe(true)
        done()
      })
  })
})
