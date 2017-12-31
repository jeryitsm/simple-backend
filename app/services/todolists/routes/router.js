const express = require('express')
const router = express.Router()

const todolistsController = require('../controllers/todolists.js')

router.route('/')
  .get(todolistsController.get)
  .post(todolistsController.createAndGetById)
  .put(todolistsController.update)
  .delete(todolistsController.remove);

module.exports = router
