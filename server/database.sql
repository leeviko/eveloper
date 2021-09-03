CREATE DATABASE journal;

CREATE TABLE users (
  uid varchar(255) NOT NULL PRIMARY KEY,
  email varchar(100) NOT NULL UNIQUE,
  name varchar(50) NOT NULL,
  password varchar(255) NOT NULL
);

CREATE TABLE blogs (
  bid varchar(255) NOT NULL PRIMARY KEY,
  uid varchar(255) REFERENCES users,
  title varchar(30) NOT NULL,
  content text NOT NULL,
  tags text[]
);