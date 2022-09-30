const express = require('express');
const router = express.Router();
const { getUser, createUser, deleteUser } = require('../controllers/users');

router.post('/', getUser);

router.post('/create', createUser);

router.delete('/:id', deleteUser);

module.exports = router;