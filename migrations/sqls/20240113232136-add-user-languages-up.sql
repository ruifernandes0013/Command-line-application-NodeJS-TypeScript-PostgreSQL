CREATE TABLE UserLanguages (
    id SERIAL PRIMARY KEY,
    userId INT REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    language varchar(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP 
);