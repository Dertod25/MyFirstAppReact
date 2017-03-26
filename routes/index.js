
var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/api/db/users', db.getAllUsers);
// router.get('/api/db/users/:id', db.getSingleUser);
router.post('/api/db/users', db.addNewUser);
router.put('/api/db/users/:id', db.updateUser);
// router.delete('/api/db/users/:id', db.removeUser);


module.exports = router;