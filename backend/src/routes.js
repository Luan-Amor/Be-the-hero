const express = require('express')

const OngController = require('./controllers/OngController')
const IncidentsController = require('./controllers/IncidentsController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.post('/session', SessionController.create)

routes.get('/ongs', OngController.selectAll)
routes.post('/ongs', OngController.create)

routes.post('/incidents', IncidentsController.create)
routes.get('/incidents', IncidentsController.selectAll)
routes.delete('/incidents/:id', IncidentsController.delete)

routes.get('/profile', ProfileController.selectAll)

module.exports = routes