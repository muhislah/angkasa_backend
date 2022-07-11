const connection = require("../config/db");

const findEmail = async (email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const register = async ({
  id,
  name,
  email,
  password,
  phone,
  city,
  address,
  postalCode,
  isVerified,
  role,
  photo,
}) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO users (id, name, email, password, phone, city, address, postalCode, isVerified, role, photo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
      [
        id,
        name,
        email,
        password,
        phone,
        city,
        address,
        postalCode,
        isVerified,
        role,
        photo,
      ],
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const setVerified = async (isVerified, email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE users SET isVerified = $1 WHERE email = $2",
      [isVerified, email],
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};
module.exports = { findEmail, register, setVerified };
