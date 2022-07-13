
CREATE TABLE airlines (
    airlineId VARCHAR(240) PRIMARY KEY,
    airlineName VARCHAR(120) NOT NULL,
    logo VARCHAR(120) NOT NULL,
    pic VARCHAR(120) NOT NULL,
    phoneNumber NUMERIC,
    status INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP
);

CREATE TABLE orderedTicket (
    orderId VARCHAR(240) PRIMARY KEY,
    passengerTitle VARCHAR(60) NOT NULL,
    passengerName VARCHAR(120) NOT NULL,
    nationality VARCHAR(120) NOT NULL,
<<<<<<< HEAD
=======
    userId VARCHAR(120) NOT NULL,
>>>>>>> 5566a8a67a6ac274ac5b55d801bd1f30de7e8c01
    airlineId VARCHAR(120) NOT NULL,
    ticketId VARCHAR(120) NOT NULL,
    status INT DEFAULT 0,
    createdAt VARCHAR(120) DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP
);

CREATE TABLE users (
id VARCHAR (255) NOT NULL,
name VARCHAR (255) NOT NULL,
email VARCHAR (255) NOT NULL,
password VARCHAR (255) NOT NULL,
phone VARCHAR (20),
city VARCHAR (255),
address VARCHAR (255),
postalCode VARCHAR (20),
photo VARCHAR (255),
isVerified INT,
role INT,
created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
updated_at timestamp
);

CREATE TABLE ticket (
    ticketId INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    departure VARCHAR(120) NOT NULL,
    arrival VARCHAR(120) NOT NULL,
    code VARCHAR(120) NOT NULL,
    class VARCHAR(120) NOT NULL,
    gate INT NOT NULL,
    terminal VARCHAR(4) NOT NULL,
    date VARCHAR(120) NOT NULL
);

<<<<<<< HEAD
INSERT INTO ticket(departure, arrival, code, class, gate, terminal, date)VALUES('IDN','JPN','AB-221','economy',221,'A','Monday, 20 July 20 - 12:33');

CREATE TABLE tickets (
  id varchar(255) NOT NULL,
  transit varchar(255) NOT NULL,
  facilities varchar(255) NOT NULL,
  departure TIME NOT NULL,
  arrive TIME NOT NULL,
  price INT NOT NULL,
  airline_id varchar(255) NOT NULL,
  origin varchar(255) NOT NULL,
  destination varchar(255) NOT NULL,
  stock INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

select * from tickets where departure between '10:00'::time(0) and '12:00'::time(0) --- to select time between
=======


INSERT INTO ticket(departure, arrival, code, class, gate, terminal, date)VALUES('IDN','JPN','AB-221','economy',221,'A','Monday, 20 July 20 - 12:33');
>>>>>>> 5566a8a67a6ac274ac5b55d801bd1f30de7e8c01
