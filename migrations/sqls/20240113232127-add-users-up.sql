CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name varchar(255) NOT NULL,
    type varchar(255),
    location varchar(255) NOT NULL,
    bio varchar(255) NOT NULL,
    publicRepos int,
    followers int,
    following int,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP 
);

