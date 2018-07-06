module.exports = (req, res, next) => {
  const { artist, title, body } = req.body
  let isValid = true

  if (!artist || !title || !body) {
    isValid = false
  }

  if (!isValid) {
    res.status(400).send({ error: 'Invalid request' })
  } else {
    next()
  }
}
