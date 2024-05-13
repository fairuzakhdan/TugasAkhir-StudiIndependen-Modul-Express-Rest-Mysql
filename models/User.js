const dbPool = require("../config/db");
const bcrypt = require("bcrypt");

const getAllUser = () => {
  const sql = `SELECT * FROM users`;
  return dbPool.execute(sql);
};

const getByEmail = (body) => {
  const sql = `SELECT * FROM users WHERE email = ?`;
  const values = [body.email];
  return dbPool.execute(sql, values);
};

const findById = (data) => {
  const sql = `SELECT * FROM users WHERE id = ${data}`;
  return dbPool.execute(sql);
}

const registerUser = (body) => {
  const passwordHash = bcrypt.hashSync(body.password, 10);
  const sql = `INSERT INTO users (username,password,email) VALUES 
  ('${body.username}','${passwordHash}','${body.email}')`;
  return dbPool.execute(sql);
};

const cariEmail = (body) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  return dbPool.execute(sql, [body.email]);
};


const getUserById = (params) => {
  const sql = `SELECT * FROM users WHERE id = ${params.id}`;
  return dbPool.execute(sql);
};

const createNewUser = (body) => {
  const passwordHash = bcrypt.hashSync(body.password, 10);
  const isAdmin = body.isAdmin ? body.isAdmin : false;
  const sql = `INSERT INTO users (username,password,email,noHp,isAdmin) VALUES ('${body.username}','${passwordHash}','${body.email}',${body.noHp},'${isAdmin}')`;
  console.log(sql);
  return dbPool.execute(sql);
};

const updateNewUser = (body, params) => {
  const passwordHash = bcrypt.hashSync(body.password, 10);
  const isAdmin = body.isAdmin ? body.isAdmin : false;
  const sql = 'UPDATE users SET username = ?, password = ?, email = ?, noHp = ?, isAdmin = ? WHERE id = ?';
  const values = [body.username, passwordHash, body.email, body.noHp, isAdmin, params.id];
  return dbPool.execute(sql, values);
};

const deleteUser = (params) => {
  const sql = `DELETE FROM users WHERE id = ${params.id}`;
  return dbPool.execute(sql);
};

module.exports = {
  getAllUser,
  getUserById,
  createNewUser,
  updateNewUser,
  deleteUser,
  getByEmail,
  registerUser,
  cariEmail,
  findById
};
