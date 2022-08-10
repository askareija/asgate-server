const Device = require("../../models").Device;

module.exports = {
  getAll,
  getPaginated,
  getOne,
  create,
  update,
  remove,
};

async function getAll() {
  // await
}

async function getPaginated() {
  // await
}

async function getOne(id) {
  return Device.findOne({
    where: { id },
  });
}

async function create(device) {
  return Device.create(device);
}

async function update(id, device) {
  return Device.update(device, { where: { id } });
}

async function remove(id) {
  const Device = await Device.findOne({ where: { id } });
  if (!Device) throw new Error("Device does not exist.");

  return Device.destroy({ where: { id } });
}
