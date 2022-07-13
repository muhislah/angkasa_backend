const pool = require("../config/db");

const create = ({ orderId, passengerTitle, passengerName, nationality, airlineId, ticketId, status }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO orderedTicket (orderId, passengerTitle, passengerName, nationality,  airlineId, ticketId, status)VALUES($1, $2, $3, $4, $5, $6, $7)",
      [orderId, passengerName, passengerTitle, nationality, airlineId, ticketId, status],
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

const update = ({ passengerTitle, passengerName, nationality, airlineId, ticketId, status, updatedAt, orderId }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE orderedTicket SET passengerTitle = COALESCE($1, passengerTitle), passengerName = COALESCE($2, passengerName), nationality = COALESCE($3, nationality), airlineId = COALESCE($4, airlineId), ticketId = COALESCE($5, ticketId), status = COALESCE($6, status), updatedAt = COALESCE($7, updatedAt) WHERE orderId = $8 ",
      [passengerTitle, passengerName, nationality, airlineId, ticketId, status, updatedAt, orderId],
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
      "SELECT airlines.logo, airlines.airlineName, tickets.departure, tickets.arrive, tickets.origin, tickets.destination, tickets.price, tickets.airline_id FROM orderedTicket INNER JOIN airlines ON orderedTicket.airlineId = airlines.airlineId INNER JOIN tickets ON orderedTicket.ticketId = tickets.id WHERE orderedTicket.orderId = $1",
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
