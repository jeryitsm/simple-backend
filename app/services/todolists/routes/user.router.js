const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.js')

router.route('/')
  .get(userController.get)
  .post(userController.createAndGetById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router