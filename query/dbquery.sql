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
    orderId INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
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
