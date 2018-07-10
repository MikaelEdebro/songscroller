import React from 'react'
import { RadioGroup } from '@material-ui/core/RadioGroup'
import Checkbox from '@material-ui/core/Checkbox'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputLabel from '@material-ui/core/InputLabel'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/lab/Slider'
import Input from '@material-ui/core/Input'
import FormHelperText from '@material-ui/core/FormHelperText'

export const renderTextField = ({ input, label, id, meta, fullWidth, ...custom }) => {
  return (
    <FormControl error={!!(meta.touched && meta.error)} fullWidth={fullWidth}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input {...input} {...custom} />
      {meta.touched && meta.error ? (
        <FormHelperText id="name-error-text">{meta.error}</FormHelperText>
      ) : null}
    </FormControl>
  )
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

export const renderSlider = ({ input, label, max }) => {
  return (
    <div style={{ width: '100%' }}>
      <Typography id="label">{label}</Typography>
      <Slider
        value={+input.value}
        onChange={(event, value) => input.onChange(value)}
        max={max || 100}
      />
    </div>
  )
}
