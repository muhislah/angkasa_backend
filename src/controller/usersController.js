const createError = require("http-errors");
const errorServ = new createError.InternalServerError();
const usersModel = require("../model/usersModel");
const { setProfile, getProfile } = require("../model/usersModel");
const helper = require("../helper/response");
const cloudinary = require("../helper/cloudinary");

// PROFILE
const profile = async (req, res, next) => {
  try {
    const id = req.decoded.id;
    const {
      rows: [users],
    } = await getProfile(id);
    helper.response(res, users, 200, "Get profile success");
  } catch (error) {
    console.log(error);
    next(errorServ);
  }
};

// Update Profile
const updateProfile = async (req, res, next) => {
  try {
    const id = req.decoded.id;
    const { name, phone, city, address, postalCode } = req.body;
    const img = req.file.path;
    const ress = await cloudinary.uploader.upload(img, { folder: "profile" });
    const data = {
      name,
      phone,
      city,
      address,
      postalCode,
      photo: ress.url,
      updated_at: new Date(),
    };
    await setProfile(data, id);
    helper.response(res, data, 200, "Success update users");
  } catch (error) {
    console.log(error);
    next(errorServ);
  }
};

// USERS

const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const result = await usersModel.getUsers({ offset, limit });
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
    if (result.length > 0) {
      helper.response(res, result, 200, "Success get users", pagination);
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
    const result = await usersModel.getUsersById(id);
    helper.response(res, result, 200, "Success get users");
  } catch (error) {
    console.log(error);
    next(errorServ);
  }
};

// const updateUsers = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const {rows:[result], rowCount} = await usersModel.getUsersById(id);
//     if(!rowCount){
//       return next(createError(404, "Data not found"));
//     }
//     if(!result.isVerified || result.role === 0){
//       return next(createError(403, "You can't update this user"));
//     }
//   }

const deleteUsers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const checkId = await usersModel.getUsersById(id);
    if (checkId.length > 0) {
      const result = await usersModel.deleteUsers(id);
      helper.response(res, result, 200, "Success delete users");
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

  deleteUsers,
  profile,
  updateProfile,
};
