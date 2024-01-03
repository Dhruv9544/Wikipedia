const checkUrlController = require('../controller/checkUrl')
const matchSyntax = require('../middleware/matchSyantax')
const express = require('express')

const Router = express.Router()

//route for checking total link visited 
Router.post('/calculate',matchSyntax,checkUrlController.CheckUrl)

module.exports = Router