const bcrypt = require("bcrypt");
const createError = require("http-errors");
const errorServ = new createError.InternalServerError();
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { generateToken, generateRefreshToken } = require("../helper/jwtAuth");
const authModel = require("../model/authModel");
const helper = require("../helper/response");
const { sendEmail } = require("../helper/email");

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const { rowCount } = await authModel.findEmail(email);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const dataRegister = {
      id: uuidv4(),
      name,
      email,
      password: hashPassword,
      phone: "",
      city: "",
      address: "",
      postalCode: "",
      isVerified: 0,
      role: role || 2,
      photo: "",
    };
    if (rowCount) {
      return next(createError(403, "Email already exists"));
    }
    await authModel.register(dataRegister);
    delete dataRegister.password;
    sendEmail(email);
    helper.response(res, dataRegister, 201, "Register success");
  } catch (error) {
    console.log(error);
    next(errorServ);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const {
      rows: [users],
    } = await authModel.findEmail(email);
    if (!users) {
      return helper.response(res, null, 404, "Email or Password is wrong");
    }
    const checkPassword = await bcrypt.compareSync(password, users.password);
    if (!checkPassword) {
      return helper.response(res, null, 404, "Email or Password is wrong");
    }
    delete users.password;

    const payload = {
      email: users.email,
      role: users.role,
      //   id: users.id,
    };
    users.token = generateToken(payload);
    users.refreshToken = generateRefreshToken(payload);
    res.cookie("token", users.token, {
      httpOnly: true,
      maxAge: 60 * 1000 * 60 * 12,
      secure: process.env.NODE_ENV !== "Development" ? true : false,
      path: "/",
      sameSite: "strict",
    });
    helper.response(res, users, 200, "Login success");
  } catch (error) {
    console.log(error);
    next(errorServ);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY);
    const payload = {
      email: decoded.email,
      role: decoded.role,
    };
    const result = {
      token: generateToken(payload),
      refreshToken: generateRefreshToken(payload),
    };
    helper.response(res, result, 200);
  } catch (error) {
    console.log(error);
    next(errorServ);
  }
};

const activation = async (req, res, next) => {
  try {
    const email = req.users.email;
    const isVerified = 1;
    const data = {
      email,
      isVerified,
    };
    await authModel.setVerified(isVerified, email);
    helper.response(res, data, 200, "Activation success");
  } catch (error) {
    console.log(error);
    next(errorServ);
  }
};
module.exports = { register, login, refreshToken, activation };
