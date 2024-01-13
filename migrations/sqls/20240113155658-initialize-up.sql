CREATE TABLE Users (
    Id SERIAL PRIMARY KEY,
    Name varchar(255) NOT NULL,
    type varchar(255),
    location varchar(255) NOT NULL,
    bio varchar(255) NOT NULL,
    public_repos int,
    followers int,
    following int
);