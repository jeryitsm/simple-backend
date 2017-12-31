// This is global routes file
const express = require('express')
const router = express.Router()
const todolistRoutes = require('../services/todolists/routes/router')
const userRoutes = require('../services/todolists/routes/user.router')

router.use('/todolists', todolistRoutes)
router.use('/user', userRoutes)
module.exports = router
