import app from './app'

app.listen(process.env.PORT || 5000)

// make sure process is terminated on Ctrl+c
process.on('SIGINT', () => {
  process.exit()
})
