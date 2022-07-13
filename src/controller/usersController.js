const createError = require("http-errors");
const errorServ = new createError.InternalServerError();
const usersModel = require("../model/usersModel");
const helper = require("../helper/response");

const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const {
      rows: [users],
    } = await usersModel.getUsers({ offset, limit });
    const {
      rows: [count],
    } = await usersModel.countUsers();
    const totalData = parseInt(count.total);
    const totalPage = Math.ceil(totalData / limit);
    const pagination = {
      currentPage: page,
      limit,
      totalData,
      totalPage,
    };
    if (users) {
      helper.response(res, users, 200, "Success get users", pagination);
    } else {
      next(createError(404, "Data not found"));
    }
  } catch (error) {
    console.log(error);
    next(errorServ);
  }
};
const getUsersById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      rows: [users],
    } = await usersModel.getUsersById(id);
    if (users) {
      helper.response(res, users, 200, "Success get users");
    } else {
      next(createError(404, "Data not found"));
    }
  } catch (error) {
    console.log(error);
    next(errorServ);
  }
};

module.exports = {
  getUsers,
  getUsersById,
};
