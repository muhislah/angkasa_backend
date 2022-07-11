const pool = require("../config/db");

const create = ({ orderId, airlineId, ticketId, status }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO orderedTicket (orderId, airlineId, ticketId, status)VALUES($1, $2, $3, $4)",
      [orderId, airlineId, ticketId, status],
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

const update = ({ airlineId, ticketId, status, updatedAt, orderId }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE orderedTicket SET airlineId = COALESCE($1, airlineId), ticketId = COALESCE($2, ticketId), status = COALESCE($3, status), updatedAt = COALESCE($4, updatedAt) WHERE orderId = $5 ",
      [airlineId, ticketId, status, updatedAt, orderId],
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

const deleteData = (orderId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM orderedTicket WHERE orderId = $1",
      [orderId],
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

const selectOrder = ({ limit, offset, sortby, sort, search, searchby }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM orderedTicket WHERE ${searchby} ILIKE'%${search}%' ORDER BY ${sortby} ${sort} LIMIT $1 OFFSET $2`,
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

const countOrder = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT COUNT(*) AS total FROM orderedTicket", (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(new Error(err));
      }
    });
  });
};

const detailOrder = (orderId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT airlines.logo, ticket.departure, ticket.arrival, ticket.code, ticket.class, ticket.terminal, ticket.gate, ticket.date FROM orderedTicket INNER JOIN airlines ON orderedTicket.airlineId = airlines.airlineId INNER JOIN ticket ON orderedTicket.ticketId = ticket.ticketId WHERE orderedTicket.orderId = $1",
      [orderId],
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


module.exports = {
  create,
  update,
  deleteData,
  selectOrder,
  countOrder,
  detailOrder,
};
