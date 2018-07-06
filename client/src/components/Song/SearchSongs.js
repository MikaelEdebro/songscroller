import React from 'react'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

const SearchSongsInput = styled.div`
  display: block;
  position: relative;
  max-width: 400px;
  margin: 0 auto 20px;

  input {
    padding: 20px;
    border-radius: 24px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.4);
    border: none;
    font-size: 20px;
    width: 100%;
  }
`
const ClearInput = styled.div`
  position: absolute;
  right: 6px;
  top: 6px;
`
const searchSongs = ({ query, onChange }) => (
  <SearchSongsInput>
    <input
      type="text"
      placeholder="Search songs"
      value={query}
      onChange={event => onChange(event.target.value)}
    />
    {query ? (
      <ClearInput>
        <IconButton color="inherit" onClick={() => onChange('')} aria-label="Clear">
          <Icon>clear</Icon>
        </IconButton>
      </ClearInput>
    ) : null}
  </SearchSongsInput>
)

export default searchSongs
