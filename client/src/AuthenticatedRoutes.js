import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loader from './components/Layout/Loader'

const SongsContainer = Loadable({
  loader: () => import('./components/Song/SongsContainer'),
  loading: Loader,
})
const SongContainer = Loadable({
  loader: () => import('./components/Song/SongContainer'),
  loading: Loader,
})
const AddSong = Loadable({
  loader: () => import('./components/Song/Edit/AddSong'),
  loading: Loader,
})
const EditSong = Loadable({
  loader: () => import('./components/Song/Edit/EditSong'),
  loading: Loader,
})
const Dashboard = Loadable({ loader: () => import('./components/Dashboard'), loading: Loader })
const Playlist = Loadable({
  loader: () => import('./components/Playlist/Playlist'),
  loading: Loader,
})
const Playlists = Loadable({
  loader: () => import('./components/Playlist/Playlists'),
  loading: Loader,
})
const AddPlaylist = Loadable({
  loader: () => import('./components/Playlist/Edit/AddPlaylist'),
  loading: Loader,
})
const EditPlaylist = Loadable({
  loader: () => import('./components/Playlist/Edit/EditPlaylist'),
  loading: Loader,
})

export default props => (
  <Switch>
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/songs/add" component={AddSong} />
    <Route exact path="/songs/edit/:id" component={EditSong} />
    <Route exact path="/songs/:id" component={SongContainer} key={document.location.href} />
    <Route exact path="/songs" component={SongsContainer} key={document.location.href} />
    <Route exact path="/playlists/add" component={AddPlaylist} />
    <Route exact path="/playlists/edit/:id" component={EditPlaylist} />
    <Route exact path="/playlists/:id" component={Playlist} />
    <Route exact path="/playlists" component={Playlists} />
    <Route render={() => <Redirect to="/dashboard" />} />
  </Switch>
)
