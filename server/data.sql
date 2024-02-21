CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    flight_number VARCHAR(20),
    departure VARCHAR(100),
    destination VARCHAR(100),
    -- Add other columns as needed for ticket information
    -- For instance, date, time, seat numbers, etc.
    -- Example:
    -- date DATE,
    -- time TIME,
    -- seats INTEGER
);


CREATE TABLE user_tickets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    ticket_id INTEGER NOT NULL,
    flight_number VARCHAR(20) NOT NULL,
    departure VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    -- Add other ticket details as needed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    -- Add foreign key constraints to link with the 'users' table
    FOREIGN KEY (ticket_id) REFERENCES tickets(id)
    -- Add foreign key constraints to link with the 'tickets' table
);



CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE ADMIN (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
    