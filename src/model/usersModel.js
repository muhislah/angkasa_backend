const connection = require("../config/db");

const getUsers = ({ limit, offset }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users LIMIT $1 OFFSET $2",
      [limit, offset],
      (err, result) => {
        if (!err) {
          resolve(result.rows);
        } else {
          reject(err);
        }
      }
    );
  });
};
const getProfile = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM users WHERE email = $1 `,
      [id],
      (error, result) => {
        if (!error) {
          resolve(result.rows);
        } else {
          reject(error);
        }
      }
    );
  });
};
const getUsersById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE id = $1",
      [id],
      (err, result) => {
        if (!err) {
          resolve(result.rows);
        } else {
          reject(err);
        }
      }
    );
  });
};

const updateUsers = (
  { name, phone, city, address, postalCode, photo, updated_at },
  id
) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE users SET name = COALESCE($1, name), phone = COALESCE($2, phone), city = COALESCE($3, city), address = COALESCE($4, address), postalCode = COALESCE($5, postalCode), photo = COALESCE($6, photo), updated_at = COALESCE($7, updated_at) WHERE id = $8",
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

const setProfile = (
  { name, phone, city, address, postalCode, photo, updated_at },
  id
) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE users SET name = COALESCE($1, name), phone = COALESCE($2, phone), city = COALESCE($3, city), address = COALESCE($4, address), postalCode = COALESCE($5, postalCode), photo = COALESCE($6, photo), updated_at = COALESCE($7, updated_at) WHERE id = $8",
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

const countUsers = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT count(*) as total FROM users", (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};

const setVerified = (isVerified, email) => {
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
module.exports = {
  getUsers,
  getProfile,
  getUsersById,
  setVerified,
  deleteUsers,
  updateUsers,
  setProfile,
  countUsers,
};
