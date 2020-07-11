const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');

const router = express.Router();

router
	.route('/top-5-cheap')
	.get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
	.route('/')
	.get(authController.protect, tourController.getAllTours)
	.post(tourController.createTour);
router
	.route('/:id')
	.get(tourController.getTour)
	.patch(tourController.updateTour)
	.delete(
		authController.protect,
		authController.restrictAccessTo('admin', 'lead-guide'),
		tourController.deleteTour
	);

router
	.route('/:tourId/reviews')
	.get(
		authController.protect,
		authController.restrictAccessTo('user'),
		reviewController.getReview
	)
	.post(
		authController.protect,
		authController.restrictAccessTo('user'),
		reviewController.createReview
	);

module.exports = router;
