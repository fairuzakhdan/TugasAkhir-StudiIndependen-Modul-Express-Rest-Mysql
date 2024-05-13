const Coffee = require("../models/Coffee");
const dbPool = require("../config/db");

const getAllCoffee = async (req, res) => {
  const [data] = await Coffee.getAllCoffee();
  res.status(200).json({ status: "success", data });
};

const getCoffeeById = async (req, res) => {
  try {
    const { params } = req;
    const [data] = await Coffee.getCoffeeById(params);
    if (data.length < 1) {
      res.status(404).json({
        status: "fail",
        message: "data tidak ditemukan",
      });
      return res;
    }
    res.status(200).json({
      status: "success",
      data,
    });
    return res;
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: "Server Error",
      error: err.message,
    });
  }
};


const createNewCoffee = async (req, res) => {
  
  try {
    const { body } = req;
    if (!body.nama_coffee || !body.deskripsi || !body.harga) {
      return res.status(400).json({
        status: "fail",
        message: "Tolong input dengan benar",
      });
    }
    const query = `
      INSERT INTO coffee (nama_coffee, deskripsi, harga, author)
      VALUES (?, ?, ?, ?)
    `;
    const values = [body.nama_coffee, body.deskripsi, body.harga,req.user[0].id];
    await dbPool.execute(query, values);

    res.status(201).json({
      status: "success",
      message: "Coffee berhasil ditambahkan",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};



const updateNewCofffe = async (req, res) => {
  const { body, params } = req;
  if (!body.nama_coffee || !body.deskripsi || !body.harga) {
    return res.status(400).json({
      status: "fail",
      message: "Tolong input dengan benar",
    });
  }
  const [data] = await Coffee.getCoffeeById(params);
  if (data.length < 1) {
    res.status(404).json({
      status: "fail",
      message: "data tidak ditemukan",
    });
    return res;
  }
  try {
    await Coffee.updateNewCofffe(body, params);
    res.status(201).json({
      message: "Update New Coffee",
      data: {
        ...params,
        ...body,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Server Error",
      error: err.message,
    });
  }
};

const deleteCoffeeById = async (req, res) => {
  const { params } = req;
  const [data] = await Coffee.getCoffeeById(params);
  if (data.length < 1) {
    res.status(404).json({
      status: "fail",
      message: "data tidak ditemukan",
    });
    return res;
  }
  try {
    await Coffee.deleteCoffeeById(params);
    res.status(200).json({
      status: "succes",
      message: "Data berhasil dihapus",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "server Error",
      error: err.message,
    });
  }
};

module.exports = {
  getAllCoffee,
  createNewCoffee,
  getCoffeeById,
  updateNewCofffe,
  deleteCoffeeById,
};
