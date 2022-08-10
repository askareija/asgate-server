const express = require('express')
const router = express.Router()
const Joi = require('joi')
const service = require('./devices.service')

// routes
router.get('/', getAll)
router.get('/paginated', getPaginated)
router.get('/:id', getById)
router.post('/', createDevice)
router.delete('/:id', deleteDevice)
module.exports = router

function getAll(req, res, next) {
  service.getAll();
}
function getPaginated(req, res, next) {
  service.getPaginated();
}
function getById(req, res, next) {
  service.getOne();
}
function createDevice(req, res, next) {
  service.create();
}
function deleteDevice(req, res, next) {
  service.create();
}
