import React from 'react'
import TextField from '@material-ui/core/TextField'
import { RadioGroup } from '@material-ui/core/RadioGroup'
import Checkbox from '@material-ui/core/Checkbox'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputLabel from '@material-ui/core/InputLabel'

export const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => {
  return <TextField label={label} error={touched && error} {...input} {...custom} />
}

export const renderCheckbox = ({ input, label, color }) => (
  <FormControlLabel
    control={
      <Checkbox
        checked={input.value ? true : false}
        onChange={input.onChange}
        color={color || 'primary'}
      />
    }
    label={label}
  />
)

export const renderRadioGroup = ({ input, children }) => (
  <FormControl component="fieldset" required>
    <FormLabel component="legend">Gender</FormLabel>
    <RadioGroup
      aria-label="gender"
      name="gender1"
      value={input.value}
      onChange={event => {
        console.log(event.target.value)
      }}
    >
      {children}
    </RadioGroup>
  </FormControl>
)

export const renderSelect = ({
  input,
  label,
  minWidth,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl style={{ minWidth }}>
    <InputLabel htmlFor={input.name}>{label}</InputLabel>
    <Select
      {...input}
      {...custom}
      onChange={event => input.onChange(event.target.value)}
      children={children}
    />
  </FormControl>
)
