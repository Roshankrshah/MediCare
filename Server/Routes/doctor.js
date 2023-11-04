const express = require('express');
const router = express.Router();
const {authenticate,restrict} = require('../utils/auth/verifyToken');

const {getSingleDoctor,updateDoctor,getAllDoctor,deleteDoctor} = require('../Controllers/doctorController');

router.route('/:id')
    .get(getSingleDoctor)
    .put(authenticate,restrict(['doctor']),updateDoctor)
    .delete(authenticate,restrict(['doctor']),deleteDoctor)

router.get('/',getAllDoctor);

module.exports = router;