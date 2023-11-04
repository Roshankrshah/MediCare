const express = require('express');

const router = express.Router({mergeParams: true});

const {getAllReviews,createReview} = require('../Controllers/reviewController');
const {authenticate,restrict} = require('../utils/auth/verifyToken');

router.route('/')
        .get(getAllReviews)
        .post(authenticate,restrict(["patient"]),createReview);

module.exports = router;