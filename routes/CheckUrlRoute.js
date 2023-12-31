const checkUrlController = require('../controller/checkUrl')
const matchSyntax = require('../middleware/matchSyantax')
const express = require('express')

const Router = express.Router()

Router.post('/calculate',matchSyntax,checkUrlController.CheckUrl)

module.exports = Router