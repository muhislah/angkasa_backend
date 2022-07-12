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