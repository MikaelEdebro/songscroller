export default [
  { name: 'artist', label: 'Artist', validation: { required: true } },
  { name: 'title', label: 'Title', validation: { required: true } },
  { name: 'body', label: 'Song Body', multiline: true, validation: { required: true } },
  { type: 'checkbox', name: 'useMonospaceFont', label: 'Use Monospace font', validation: {} },
]
