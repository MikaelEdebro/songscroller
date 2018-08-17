const request = require('supertest')
const app = require('../../app')
const mongoose = require('mongoose')
const Song = mongoose.model('song')
const User = mongoose.model('user')
const mockUser = require('../mocks').user

process.env.TEST_SUITE = 'songcontroller-test'

describe('SongController', () => {
  let userId = mockUser._id

  test('GET to /api/songs fetches all songs associated to the user', async done => {
    await new Song({ _user: userId, artist: 'Artist 1', title: 'Title 1', body: 'Body 1' }).save()
    await new Song({ _user: userId, artist: 'Artist 2', title: 'Title 2', body: 'Body 2' }).save()
    await new Song({ _user: userId, artist: 'Artist 3', title: 'Title 3', body: 'Body 3' }).save()
    await new Song({
      _user: new User({})._id, // create song associated with other user to make sure it's not returned
      artist: 'Artist 3',
      title: 'Title 3',
      body: 'Body 3',
    }).save()

    request(app)
      .get('/api/songs')
      .end((err, response) => {
        const songs = response.body
        expect(songs).toHaveLength(3)
        done()
      })
  })

  test('GET to /api/songs/:id fetches song by id', async done => {
    const newSong = await new Song({
      _user: userId,
      artist: 'Artist 1',
      title: 'Title 1',
      body: 'Body 1',
    }).save()

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
})
