const express = require('express');
const router = express.Router();
const {authenticate,restrict} = require('../utils/auth/verifyToken');

const {updateUser,deleteUser,getSingleUser,getAllUser} = require('../Controllers/userController');

router.route('/:id')
    .get(authenticate,restrict(['patient']),getSingleUser)
    .put(authenticate,restrict(['patient']),updateUser)
    .delete(authenticate,restrict(['patient']),deleteUser)

router.get('/',authenticate,restrict(['admin']),getAllUser);

module.exports = router;