const express = require('express')
const app = express()
const mongoose = require('mongoose')

let port = 3000

mongoose.connect('mongodb://localhost/addressbook', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const addressRoutes = require('./routes/addressRoutes')
app.use('/address', addressRoutes)
app.listen(port, () => console.log('Server Started at :', port))
