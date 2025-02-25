const express = require('express')
const path = require('path')
const routeDir = require('../util/path')
const adminData = require('./admin')

const app = express()

app.get('/', (req, res, next) => {
    // console.log(adminData.products)
    // res.sendFile(path.join(routeDir, 'views', 'shop.html')) // send response

    const products = adminData.products
    res.render('shop', {prods: products, pageTitle: 'Shop'}) // pug file
})

module.exports = app