const express = require("express");
const router = express.Router();
const Joi = require("joi");
const service = require("./devices.service");

// routes
router.get("/", getAll);
router.get("/paginated", getPaginated);
router.get("/:id", getById);
router.post("/", createDevice);
router.delete("/:id", deleteDevice);
module.exports = router;

function getAll(req, res, next) {
  service
    .getAll()
    .then((data) => res.json(data))
    .catch((err) => next(err));
}
function getPaginated(req, res, next) {
  service
    .getPaginated()
    .then((data) => res.json(data))
    .catch((err) => next(err));
}
function getById(req, res, next) {
  service
    .getOne(req.params.id)
    .then((data) => (data ? res.json(data) : res.sendStatus(404)))
    .catch((err) => next(err));
}
function createDevice(req, res, next) {
  const schema = Joi.object({
    id: Joi.string().required(),
    modelType: Joi.string().required(),
    machineId: Joi.string().required(),
    operatorName: Joi.string().required(),
    isDualSim: Joi.boolean().required(),
    phoneNumber: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(422).json({
      errors: error.details,
    });
  }

  service
    .create(req.body)
    .then((data) => (data ? res.json(data) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function deleteDevice(req, res, next) {
  service
    .remove(req.params.id)
    .then(() => res.sendStatus(200))
    .catch((err) => next(err));
}
