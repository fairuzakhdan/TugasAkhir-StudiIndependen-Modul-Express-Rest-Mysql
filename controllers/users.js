const User = require("../models/User");

const getAllUser = async (req, res) => {
  try {
    const [data] = await User.getAllUser();
    res.status(200).json({ status: "success", data });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: "Server Error",
      error: err.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { params } = req;
    const [data] = await User.getUserById(params);
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

const createNewUser = async (req, res) => {
  try {
    const { body } = req;
    if (!body.username || !body.password || !body.email || !body.noHp) {
      res.status(400).json({
        status: "fail",
        message: "Tolong input dengan benar",
      });
      return res;
    }
    await User.createNewUser(body);
    res.status(201).json({
      status: "success",
      message: "Users berhasil ditambahkan",
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: "Server Error",
      error: err.message,
    });
  }
};
const updateNewUser = async (req, res) => {
  try {
    const { body, params } = req;
    const [data] = await User.getUserById(params);
    if (data.length < 1) {
      res.status(404).json({
        status: "fail",
        message: "data tidak ditemukan",
      });
      return res;
    }
    if (!body.username || !body.password || !body.email || !body.noHp) {
      return res.status(400).json({
        status: "fail",
        message: "Tolong input dengan benar",
      });
    }
    try {
      await User.updateNewUser(body, params);
      res.status(201).json({
        message: "Update New Users",
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
  } catch (err) {
    console.log(err.message);
  }
};

const deleteUser = async (req, res) => {
  const { params } = req;
  const [data] = await User.getUserById(params);
  if (data.length < 1) {
    res.status(404).json({
      status: "fail",
      message: "data tidak ditemukan",
    });
    return res;
  }
  try {
    await User.deleteUser(params);
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
  getAllUser,
  getUserById,
  createNewUser,
  updateNewUser,
  deleteUser,
};
