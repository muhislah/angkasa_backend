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
      "INSERT INTO users (id, name, email, password, phone, city, address, postalcode, isverified, role, photo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
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

const setVerified = (
  {
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
    activatedAt,
  },
  emailID
) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email), password = COALESCE($3, password), phone = COALESCE($4, phone), city = COALESCE($5, city), address = COALESCE($6, address), postalcode = COALESCE($7, postalcode), isverified = COALESCE($8, isverified), role = COALESCE($9, role), photo = COALESCE($10, photo), updated_at = COALESCE($11, updated_at) WHERE email = $12",
      [
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
        activatedAt,
        emailID,
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
const findProfile = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE id = $1",
      [id],
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
const setProfile = (
  { name, phone, city, address, postalCode, photo, updated_at },
  id
) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE users SET name = COALESCE($1, name), phone = COALESCE($2, phone), city = COALESCE($3, city), address = COALESCE($4, address), postalcode = COALESCE($5, postalcode), photo = COALESCE($6, photo), updated_at = COALESCE($7, updated_at) WHERE id = $8",
      [name, phone, city, address, postalCode, photo, updated_at, id],
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

const deleteUsers = (id) => {
  return new Promise((resolve, reject) => {
    connection.query("DELETE FROM users WHERE id = $1", [id], (err, result) => {
      if (!err) {
        resolve("Success delete users");
      } else {
        reject(err);
      }
    });
  });
};
module.exports = {
  findEmail,
  register,
  setVerified,
  findProfile,
  setProfile,
  deleteUsers,
};
