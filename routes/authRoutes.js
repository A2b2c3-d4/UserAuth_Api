const express = require("express");
const jwt = require("../middleware/jwt")
const {createUser, getUser, getUsers, updateUser, deleteUser, Register, login} = require("../controller/authController");

const router = express.Router();

router.post('/register', Register);
router.post('/login', login)
router.post('/createUser', jwt, createUser);
router.get('/getUserById/:id', jwt, getUser);
router.get('/getUsers',jwt, getUsers);
router.put('/updateUserById/:id',jwt, updateUser);
router.delete('/deleteUserById/:id',jwt, deleteUser);

module.exports = router;