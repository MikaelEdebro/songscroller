import request from 'supertest'
import app from '../../app'
import { User, Song } from '../../models'
import mockUser from '../mocks/user'
import mongoose from 'mongoose'

describe('SongController', () => {
  let db

  beforeAll(async () => {
    db = await mongoose.connect('mongodb://localhost:27017/songscroller-test')
  })

  beforeEach(async () => {
    await Song.remove({})
  })

  afterAll(async () => {
    db.close()
  })

  const userId = mockUser._id

  test('GET to /api/songs fetches all songs associated to the user', async done => {
    await addSong(userId, 'Artist 1', 'Title 1', 'Body 1')
    await addSong(userId, 'Artist 2', 'Title 2', 'Body 2')
    await addSong(userId, 'Artist 3', 'Title 3', 'Body 3')
    // create song associated with other user to make sure it's not returned
    await addSong(new User({})._id, 'Artist 2', 'Title 2', 'Body 2')

    request(app)
      .get('/api/songs')
      .end((err, response) => {
        const songs = response.body
        expect(songs).toHaveLength(3)
        done()
      })
  })

  test('GET to /api/songs/:id fetches song by id', async done => {
    const newSong = await addSong(userId)

    request(app)
      .get(`/api/songs/${newSong._id}`)
      .end((err, response) => {
        const song = response.body
        expect(song._id.toString()).toEqual(newSong._id.toString())
        done()
      })
  })

  test('POST to /api/songs creates a song', done => {
    request(app)
      .post('/api/songs')
      .send({ artist: 'Artist', title: 'Title', body: 'Body' })
      .end((err, response) => {
        const song = response.body
        expect(song.artist).toEqual('Artist')
        expect(song.title).toEqual('Title')
        expect(song.body).toEqual('Body')
        expect(song._user.toString()).toEqual(userId.toString())
        done()
      })
  })

  test('DELETE to /api/songs/:id removes the correct song', async done => {
    const newSong = await addSong(userId)

    request(app)
      .delete('/api/songs/' + newSong._id)
      .end(async (err, response) => {
        const deletedSong = await Song.findById(newSong._id)
        expect(deletedSong).toBeNull()
        done()
      })
  })
})

async function addSong(
  userId: string,
  artist: string = 'Artist 1',
  title: string = 'Title 1',
  body: string = 'Body 1'
): Promise<mongoose.Document> {
  return await new Song({
    _user: userId,
    artist,
    title,
    body,
  }).save()
}
