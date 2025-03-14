const express = require("express");

const authController = require('../controllers/auth_controller')

const router = express.Router()

router.get('/signup', authController.getSignup)

router.post('/signup', authController.postSignup)

router.get('/login', authController.getLogin)

router.post('/login', authController.postLogin)

router.post('/logout', authController.postLogout)

module.exports = router