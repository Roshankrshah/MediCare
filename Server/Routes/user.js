const express = require('express');
const router = express.Router();
const {authenticate,restrict} = require('../utils/auth/verifyToken');

const {
    updateUser,
    deleteUser,
    getSingleUser,
    getAllUser,
    getUserProfile,
    getMyAppointments
} = require('../Controllers/userController');

router.route('/:id')
    .get(authenticate,restrict(['patient']),getSingleUser)
    .put(authenticate,restrict(['patient']),updateUser)
    .delete(authenticate,restrict(['patient']),deleteUser)

router.get('/',authenticate,restrict(['admin']),getAllUser);
router.get('/profile/me',authenticate,restrict(["patient"]),getUserProfile);
router.get('/appointments/my-appointments',authenticate,restrict(['patient']),getMyAppointments);

module.exports = router;