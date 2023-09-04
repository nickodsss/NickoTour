const express = require('express')
const router = express.Router()
const CartController = require('../controllers/cartController')

router.get('/cart', CartController.listCart)
router.post('/cart/:id', CartController.addCart)
router.patch('/cart/:id', CartController.editPersonCart)
router.delete('/cart/:id', CartController.deleteCart)

module.exports = router
