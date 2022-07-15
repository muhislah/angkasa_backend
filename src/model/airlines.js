const pool = require("../config/db");

const create = ({ airlineId, airlineName, logo, pic, phoneNumber }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO airlines (airlineId, airlineName, logo, pic, phoneNumber)VALUES($1, $2, $3, $4, $5)",
      [airlineId, airlineName, logo, pic, phoneNumber],
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      }
    );
  });
};

const update = ({
  airlineName,
  logo,
  pic,
  phoneNumber,
  status,
  updatedAt,
  airlineId,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE airlines SET airlineName = COALESCE($1, airlineName), logo = COALESCE($2, logo), pic = COALESCE($3, pic), phoneNumber = COALESCE($4, phoneNumber), status = COALESCE($5, status), updatedAt = COALESCE($6, updatedAt) WHERE airlineId = $7 ",
      [airlineName, logo, pic, phoneNumber, status, updatedAt, airlineId],
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      }
    );
  });
};

const deleteData = (airlineId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM airlines WHERE airlineId = $1",
      [airlineId],
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      }
    );
  });
};

const selectAirline = ({ limit, offset, sortby, sort, search, searchby }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM airlines WHERE ${searchby} ILIKE'%${search}%' ORDER BY ${sortby} ${sort} LIMIT $1 OFFSET $2`,
      [limit, offset],
      (err, result) => {
        if (!err) {
          resolve(result.rows);
        } else {
          reject(new Error(err));
        }
      }
    );
  });
};

const countAirline = () => { 
  return new Promise((resolve, reject) => {
    pool.query("SELECT COUNT(*) AS total FROM airlines", (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(new Error(err));
      }
    });
  });
};
const detailAirline = (airlineId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM airlines WHERE airlineId = $1",
      [airlineId],
      (err, result) => {
        if (!err) {
          resolve(result.rows);
        } else {
          reject(new Error(err));
        }
      }
    );
  });
};

const selectAirlineByStatus = ({status, limit, offset}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM airlines WHERE status = $1 limit $2 offset $3",
      [status, limit, offset],
      (err, result) => {
        if (!err) {
          resolve(result.rows);
        } else {
          reject(new Error(err));
        }
      }
    );
  });
};
const countAirlineStatus = ({status}) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT COUNT(*) AS total FROM airlines where status = $1",[status], (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(new Error(err));
      }
    });
  });
};
module.exports = {
  create,
  update,
  deleteData,
  selectAirline,
  countAirline,
  detailAirline,
  selectAirlineByStatus,
  countAirlineStatus
};
