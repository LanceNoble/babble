require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')

const user = require('./controllers/User.js')
const story = require('./controllers/Story.js')

async function main() {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1/Babble")
}

main().catch(err => console.log(err))

const app = express()
app.set('trust proxy', true)

app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] !== 'https')
        res.redirect(`https://${req.hostname}${req.url}`)
    next()
})
app.use(express.static(__dirname + '/views'))
app.use(express.json())

app.get('/user', user.get)
app.post('/user', user.post)

app.get('/story', story.get)
app.post('/story', story.post)

app.listen(process.env.PORT || 3000, () => console.log(`Listening on port ${port}`))