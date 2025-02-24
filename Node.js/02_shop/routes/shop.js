const express = require('express')
const path = require('path')
const routeDir = require('../util/path')

const app = express()

app.get('/', (req, res, next) => {
    res.sendFile(path.join(routeDir, 'views', 'shop.html')) // send response
})

module.exports = app