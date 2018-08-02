import React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Loader from '../Layout/Loader'

const PlaylistAddSongsDialog = ({ open, onClose, children, fullScreen, showLoader }) => {
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      scroll="paper"
      fullScreen={fullScreen}
    >
      <DialogTitle id="simple-dialog-title">
        <Grid container justify="space-between" alignItems="center">
          Add songs
          <IconButton onClick={onClose}>
            <Icon style={{}}>close</Icon>
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent>{showLoader ? <Loader text="Loading Songs" /> : children}</DialogContent>
    </Dialog>
  )
}

export default withMobileDialog()(PlaylistAddSongsDialog)
