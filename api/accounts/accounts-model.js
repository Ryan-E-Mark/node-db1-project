const db = require('../../data/db-config');

async function getAll() {
  const result = await db('accounts');
  return result;
}

async function getById(id) {
  const result = await db('accounts').where('id', id);
  return result[0];
}

async function create(account) {
  const result = await db('accounts').insert(account);
  return result;
}

async function updateById(id, account) {
  const result = await db('accounts').where('id', id).update(account);
  return result;
}

async function deleteById(id) {
  const result = await db('accounts').where('id', id).del();
  return result;
}

async function getByName(name) {
  const result = await db('accounts').where('name', name).first();
  return result;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByName,
}
