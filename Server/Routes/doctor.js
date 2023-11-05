const express = require('express');
const router = express.Router();
const {authenticate,restrict} = require('../utils/auth/verifyToken');

const {
    getSingleDoctor,
    updateDoctor,
    getAllDoctor,
    deleteDoctor,
    getDoctorProfile
} = require('../Controllers/doctorController');

const reviewRouter = require('./review');

router.use('/:doctorId/review',reviewRouter);

router.route('/:id')
    .get(getSingleDoctor)
    .put(authenticate,restrict(['doctor']),updateDoctor)
    .delete(authenticate,restrict(['doctor']),deleteDoctor)

router.get('/',getAllDoctor);
router.get('/profile/me',authenticate,restrict(['doctor']),getDoctorProfile);

module.exports = router;