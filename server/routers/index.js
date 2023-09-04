const express = require('express')
const router = express.Router()
const Controller = require('../controllers/loginRegister')
const tourRouter = require('./tour')
const cartRouter = require('./cart')
const { authentication } = require('../middlewares/authentication')

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/auth/google-sign-in', Controller.googleSignIn)

router.use(tourRouter)
router.use(authentication)
router.get('/listUser', Controller.fetchUserId)
router.patch('/subscription', Controller.subscription)
router.post('/generate-midtrans-token', Controller.midtransToken)
router.use(cartRouter)


module.exports = router