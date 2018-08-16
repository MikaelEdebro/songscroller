module.exports = (err, req, res, next) => {
  const errorMessage = err.message || 'Fallback error message'
  res.status(422).send({ error: errorMessage })
}
