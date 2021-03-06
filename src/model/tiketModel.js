const pool = require("../config/db")

const getAllTicket = ({ transit, facilities, departure, arrive, airline, min_price, max_price, country_origin, country_destination, class : kelas , destination, limit, orderby, order, offset }) => {

  const pagination = `ORDER BY t.${orderby} ${order} LIMIT ${limit} OFFSET ${offset}`

  if (transit || facilities || departure || arrive || airline || min_price || max_price || destination || country_origin || country_destination || kelas) {
    const vtransit = transit ? `and t.transit ILIKE '%${transit}%' ` : ''
    const vfacilities = facilities ? `and t.facilities ILIKE '%${facilities}%' ` : ''
    const vcountry_origin = country_origin ? `and t.country_origin ILIKE '%${country_origin}%' ` : ''
    const vcountry_destination = country_destination ? `and t.country_destination ILIKE '%${country_destination}%' ` : ''
    const vkelas = kelas ? `and t.class ILIKE '%${kelas}%' ` : ''

    let vdeparture;
    if (departure === "mid") {
      vdeparture = `and departure between '00:00'::time(0) and '05:59'::time(0) `
    } else if (departure == "morning") {
      vdeparture = `and departure between '06:00'::time(0) and '11:59'::time(0)`
    } else if (departure == "afternoon") {
      vdeparture = `and departure between '12:00'::time(0) and '17:59'::time(0) `
    } else if (departure == "night") {
      vdeparture = `and departure between '18:00'::time(0) and '23:59'::time(0) `
    } else {
      vdeparture = ''
    }
    let varrive
    if (arrive === "mid") {
      varrive = `and arrive between '00:00'::time(0) and '05:59'::time(0) `
    } else if (arrive == "morning") {
      varrive = `and arrive between '06:00'::time(0) and '11:59'::time(0) `
    } else if (arrive == "afternoon") {
      varrive = `and arrive between '12:00'::time(0) and '17:59'::time(0) `
    } else if (arrive == "night") {
      varrive = `and arrive between '18:00'::time(0) and '23:59'::time(0) `
    } else {
      varrive = ''
    }
    const vairline = airline ? `and a.airlinename ILIKE '%${airline}%' ` : ''
    const vprice = max_price ? `and t.price BETWEEN '${+min_price}' and '${+max_price}' ` : ''
    const vdestination = destination ? `t.destination ILIKE '%${destination}%' ` : `t.destination ILIKE '%%'`
    return pool.query("SELECT t.id, t.transit, t.facilities, to_char(t.departure , 'HH24:MI') as departure , to_char(t.arrive , 'HH24:MI') as arrive , t.gate, t.terminal, t.airport, CONCAT(t.gate,'-',t.terminal) as code, t.price, to_char(t.departure_date, 'FMDay, DD FMMonth YY') as date, t.origin, t.country_origin,  t.destination, t.country_destination, t.class, a.airlinename as airline , a.logo as airline_logo, t.stock FROM tickets as t JOIN airlines as a ON t.airline_id = a.airlineid where " + vdestination + vcountry_origin + vcountry_destination + vkelas + vtransit + vfacilities + vdeparture + varrive + vairline + vprice + pagination)

  } else {
    return pool.query("SELECT t.id, t.transit, t.facilities, to_char(t.departure , 'HH24:MI') as departure , to_char(t.arrive , 'HH24:MI') as arrive, t.gate, t.terminal, t.airport, CONCAT(t.gate,'-',t.terminal) as code, t.price, to_char(t.departure_date, 'FMDay, DD FMMonth YYYY') as date, t.origin, t.country_origin,  t.destination, t.country_destination, t.class, a.airlinename as airline , a.logo as airline_logo, t.stock FROM tickets as t JOIN airlines as a ON t.airline_id = a.airlineid "+pagination)
  }
}

const getTicketDetail = (id) => {
  return pool.query("SELECT t.id, t.transit, t.facilities, to_char(t.departure , 'HH24:MI') as departure , to_char(t.arrive , 'HH24:MI') as arrive, t.gate, t.terminal, t.airport, CONCAT(t.gate,'-',t.terminal) as code, t.price, to_char(t.departure_date, 'FMDay, DD FMMonth YYYY') as date, t.origin, t.country_origin,  t.destination, t.airline_id, t.country_destination, t.class, a.airlinename as airline , a.logo as airline_logo, t.stock FROM tickets as t JOIN airlines as a ON t.airline_id = a.airlineid WHERE t.id = $1",[id])
}

const addTicket = ({ id, transit, facilities, departure, arrive, price, airline_id, origin, destination, country_origin, country_destination, class : kelas, stock, departure_date, gate, terminal, airport }) => {
  return pool.query('INSERT INTO tickets (id, transit, facilities, departure, arrive, price, airline_id, origin, destination, country_origin, country_destination, class, stock, departure_date, gate, terminal, airport) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)', [id, transit, facilities, departure, arrive, price, airline_id, origin, destination, country_origin, country_destination, kelas , stock, departure_date, gate, terminal, airport])
}

const countData = ({ transit, facilities, departure, arrive, airline, min_price, max_price, destination, country_origin, country_destination, class : kelas }) => {
  if (transit || facilities || departure || arrive || airline || min_price || max_price || destination || country_origin || country_destination || kelas) {
    const vtransit = transit ? `and t.transit ILIKE '%${transit}%' ` : ''
    const vfacilities = facilities ? `and t.facilities ILIKE '%${facilities}%' ` : ''
    const vcountry_origin = country_origin ? `and t.country_origin ILIKE '%${country_origin}%' ` : ''
    const vcountry_destination = country_destination ? `and t.country_destination ILIKE '%${country_destination}%' ` : ''
    const vkelas = kelas ? `and t.class ILIKE '%${kelas}%' ` : ''
    let vdeparture;
    if (departure === "mid") {
      vdeparture = `and departure between '00:00'::time(0) and '05:59'::time(0) `
    } else if (departure == "morning") {
      vdeparture = `and departure between '06:00'::time(0) and '11:59'::time(0)`
    } else if (departure == "afternoon") {
      vdeparture = `and departure between '12:00'::time(0) and '17:59'::time(0) `
    } else if (departure == "night") {
      vdeparture = `and departure between '18:00'::time(0) and '23:59'::time(0) `
    } else {
      vdeparture = ''
    }
    let varrive
    if (arrive === "mid") {
      varrive = `and arrive between '00:00'::time(0) and '05:59'::time(0) `
    } else if (arrive == "morning") {
      varrive = `and arrive between '06:00'::time(0) and '11:59'::time(0) `
    } else if (arrive == "afternoon") {
      varrive = `and arrive between '12:00'::time(0) and '17:59'::time(0) `
    } else if (arrive == "night") {
      varrive = `and arrive between '18:00'::time(0) and '23:59'::time(0) `
    } else {
      varrive = ''
    }
    const vairline = airline ? `and a.airlinename ILIKE '%${airline}%' ` : ''
    const vprice = max_price ? `and t.price BETWEEN '${+min_price}' and '${+max_price}' ` : ''
    const vdestination = destination ? `t.destination ILIKE '%${destination}%' ` : `t.destination ILIKE '%%'`
    return pool.query('SELECT COUNT(*) as total FROM tickets as t JOIN airlines as a ON t.airline_id = a.airlineid where ' + vdestination + vtransit + vfacilities + vdeparture + varrive + vcountry_origin + vcountry_destination + vkelas + vairline + vprice)

  } else {
    return pool.query('SELECT COUNT(*) as total  FROM tickets as t JOIN airlines as a ON t.airline_id = a.airlineid')
  }
}


const updateTicket = ({ id, transit, facilities, departure, departure_date, arrive, price, airline_id, origin, destination, stock, country_origin, country_destination, class : kelas , gate, terminal, airport}) => {
  const vtransit = transit || null
  const vfacilities = facilities || null
  const vdeparture = departure || null
  const varrive = arrive || null
  const vprice = price || null
  const vairline_id = airline_id || null
  const vorigin = origin || null
  const vdestination = destination || null
  const vstock = stock || null
  const vcountry_origin = country_origin || null
  const vcountry_destination = country_destination || null
  const vkelas = kelas || null
  const vdeparture_date = departure_date || null
  const vgate = gate || null
  const vterminal = terminal || null
  const vairport = airport || null
  return pool.query('UPDATE tickets SET transit = COALESCE($1, transit) ,  facilities = COALESCE($2, facilities), departure = COALESCE($3, departure), arrive = COALESCE($4, arrive), price = COALESCE($5, price) , airline_id =  COALESCE($6, airline_id), origin = COALESCE($7, origin), destination = COALESCE($8, destination), stock = COALESCE($9, stock) ,country_origin = COALESCE($10,country_origin), country_destination = COALESCE($11,country_destination), class = COALESCE($12, class), departure_date = COALESCE($13, departure_date), gate = COALESCE($14, gate), terminal = COALESCE($15, terminal), airport = COALESCE($16, airport) WHERE id = $17', [vtransit, vfacilities, vdeparture, varrive, vprice, vairline_id, vorigin, vdestination, vstock, vcountry_origin, vcountry_destination, vkelas, vdeparture_date, vgate, vterminal, vairport, id])
}

const deleteTicket = (id) => {
  return pool.query('DELETE FROM tickets WHERE id = $1', [id])
}

module.exports = { getAllTicket, addTicket, updateTicket, deleteTicket, countData, getTicketDetail }