const express = require('express');
const router = express.Router();
const { getUser, createUser, deleteUser } = require('../controllers/users');

router.post('/', getUser);

router.post('/create', createUser);

router.delete('/', deleteUser);

module.exports = router;