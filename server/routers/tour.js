const express = require('express')
const router = express.Router()
const TourController = require('../controllers/tourController')

router.get('/tours', TourController.fetchTourLists)
router.get('/tours/:id', TourController.fetchTourDetail)
router.get('/currency', TourController.currency)

module.exports = router