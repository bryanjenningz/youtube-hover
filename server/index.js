const express = require('express')
const app = express()

app.use(express.static('dist'))

app.get('/*', (req, res) => {
  res.sendFile('dist/index.html', {root: './'})
})

app.listen(3000, () => console.log('Listening on port 3000'))
