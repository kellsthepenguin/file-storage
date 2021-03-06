const PORT = process.env.ImgStoragePort || 8080

const express = require('express')
const multer = require('multer')

const { readFileSync } = require('fs')
const { parse } = require('yaml')

const { dest } = parse(readFileSync('./settings.yml', 'utf-8'))

const app = express()
const uploader = multer()

app.use(express.static('./static/'))

app.disable('x-powered-by')

app.set('dest', dest)

app.get('/upload/:name', require('./routes/getUpload'))
app.post('/upload', uploader.single('img'), require('./routes/postUpload'))

app.listen(PORT, () => console.log(`ImgStorage is running on http://localhost:${PORT}`))
