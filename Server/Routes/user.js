const express = require('express');
const router = express.Router();

const {updateUser,deleteUser,getSingleUser,getAllUser} = require('../Controllers/userController');

router.route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

router.get('/',getAllUser);

module.exports = router;