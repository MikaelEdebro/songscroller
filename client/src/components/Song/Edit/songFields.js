export default [
  { name: 'artist', label: 'Artist', validation: { required: true }, widths: { xs: 12, sm: 6 } },
  { name: 'title', label: 'Title', validation: { required: true }, widths: { xs: 12, sm: 6 } },
  {
    name: 'body',
    label: 'Song Body',
    multiline: true,
    validation: { required: true },
    widths: { xs: 12 },
  },
  {
    type: 'checkbox',
    name: 'useMonospaceFont',
    label: 'Use Monospace font',
    validation: {},
    widths: { xs: 12, sm: 6 },
  },
]
