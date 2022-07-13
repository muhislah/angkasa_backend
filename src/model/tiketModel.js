const pool = require("../config/db")

const getAllTicket = () => {
  return pool.query('SELECT t.id, t.transit, t.facilities, t.departure, t.arrive, t.price, t.origin, t.destination, a.airlinename as airline , a.logo as airline_logo, t.stock FROM tickets as t JOIN airlines as a ON t.airline_id = a.airlineid ORDER BY t.created_at DESC')
}

const getTicketbyFilter = ({transit, facilities, departure, arrive, airline_id, min_price, max_price , destination}) => {
  const vtransit = transit ? `and t.transit ILIKE '%${transit}%' ` : ''
  const vfacilities = facilities ? `and t.facilities ILIKE '%${facilities}%' ` : ''
  let vdeparture;
  if (departure === "mid"){
    vdeparture = `and departure between '00:00'::time(0) and '05:59'::time(0) `
  }else if(departure == "morning"){
    vdeparture = `and departure between '06:00'::time(0) and '11:59'::time(0)`
  }else if(departure == "afternoon"){
    vdeparture = `and departure between '12:00'::time(0) and '17:59'::time(0) `
  }else if(departure == "night"){
    vdeparture = `and departure between '18:00'::time(0) and '23:59'::time(0) `
  }else {
    vdeparture = ''
  }
  let varrive
  if (arrive === "mid"){
    varrive = `and arrive between '00:00'::time(0) and '05:59'::time(0) `
  }else if(arrive == "morning"){
    varrive = `and arrive between '06:00'::time(0) and '11:59'::time(0) `
  }else if(arrive == "afternoon"){
    varrive = `and arrive between '12:00'::time(0) and '17:59'::time(0) `
  }else if(arrive == "night"){
    varrive = `and arrive between '18:00'::time(0) and '23:59'::time(0) `
  }else {
    varrive = ''
  }
  const vairline_id = airline_id ? `and t.airline_id ILIKE '%${airline_id}%' ` : ''
  const vprice = max_price ? `and t.price BETWEEN ${min_price} and ${max_price} ` : ''
  const vdestination = destination ? `t.destination ILIKE '%${destination}%' ` : `t.destination ILIKE '%%'`
  return pool.query('SELECT t.id, t.transit, t.facilities, t.departure, t.arrive, t.price, t.origin, t.destination, a.airlinename as airline , a.logo as airline_logo, t.stock FROM tickets as t JOIN airlines as a ON t.airline_id = a.airlineid where '+vdestination+vtransit+vfacilities+vdeparture+varrive+vairline_id+vprice)
}

const addTicket = ({id, transit, facilities, departure, arrive, price, airline_id, origin, destination, stock}) => {
  return pool.query('INSERT INTO tickets (id, transit, facilities, departure, arrive, price, airline_id, origin, destination, stock) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [id, transit, facilities, departure, arrive, price, airline_id, origin, destination, stock])
}

const updateTicket = ({id, transit, facilities, departure, arrive, price, airline_id, origin, destination, stock}) => {
  const vtransit = transit || null
  const vfacilities = facilities || null 
  const vdeparture = departure || null
  const varrive = arrive || null
  const vprice = price || null
  const vairline_id = airline_id || null
  const vorigin = origin || null
  const vdestination = destination || null
  const vstock = stock || null

  return pool.query('UPDATE tickets SET transit = COALESCE($1, transit) , facilities = COALESCE($2, facilities), departure = COALESCE($3, departure), arrive = COALESCE($4, arrive), price = COALESCE($5, price) , airline_id =  COALESCE($6, airline_id), origin = COALESCE($7, origin), destination = COALESCE($8, destination), stock = COALESCE($9, stock) WHERE id = $10', [vtransit, vfacilities, vdeparture, varrive, vprice, vairline_id, vorigin, vdestination, vstock, id])
}

const deleteTicket = (id) => {
  return pool.query('DELETE FROM tickets WHERE id = $1', [id])
}

module.exports = { getAllTicket, getTicketbyFilter, addTicket, updateTicket, deleteTicket}