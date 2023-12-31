const checkUrlController = require('../controller/checkUrl')
const express = require('express')

const Router = express.Router()

Router.post('/calculate',checkUrlController.CheckUrl)

module.exports = Router