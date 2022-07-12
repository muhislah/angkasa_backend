CREATE TABLE ticket {
  id varchar
}

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
    airlineId VARCHAR(120) NOT NULL,
    ticketId INT NOT NULL,
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

INSERT INTO ticket(departure, arrival, code, class, gate, terminal, date)VALUES('IDN','JPN','AB-221','economy',221,'A','Monday, 20 July 20 - 12:33');
