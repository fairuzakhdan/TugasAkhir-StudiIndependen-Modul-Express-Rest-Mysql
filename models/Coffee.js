 
const dbPool = require("../config/db");

const getAllCoffee = () => {
  const sql = `SELECT * FROM coffee`;
  return dbPool.execute(sql);
};

const createNewCoffee = async (body) => {
  const sql = `INSERT INTO coffee (nama_coffee, deskripsi, harga, author) VALUES (?, ?, ?, ?)`;
  const values = [body.nama_coffee, body.deskripsi, body.harga, body.author];
  return dbPool.execute(sql, values);
};

const getCoffeeById = (params) => {
  const sql = `SELECT * FROM coffee WHERE id = ${params.id}`;
  return dbPool.execute(sql);
};

const updateNewCofffe = (body, params) => {
  const sql = `UPDATE coffee SET nama_coffee = '${body.nama_coffee}',deskripsi = '${body.deskripsi}', harga = ${body.harga} WHERE id = ${params.id}`;
  return dbPool.execute(sql);
};

const deleteCoffeeById = (params) => {
  const sql = `DELETE FROM coffee WHERE id = ${params.id}`;
  return dbPool.execute(sql);
}

module.exports = {
  getAllCoffee,
  createNewCoffee,
  getCoffeeById,
  updateNewCofffe,
  deleteCoffeeById
};
