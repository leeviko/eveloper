CREATE DATABASE eveloper;

CREATE TABLE users (
  uid varchar(255) NOT NULL PRIMARY KEY,
  email varchar(100) NOT NULL UNIQUE,
  name varchar(50) NOT NULL,
  password varchar(255) NOT NULL
);

CREATE TABLE posts (
  bid varchar(255) NOT NULL PRIMARY KEY,
  uid varchar(255) REFERENCES users,
  title varchar(30) NOT NULL,
  content text NOT NULL,
  tags text[],
);

CREATE TABLE votes_blogs (
  vote_id varchar(255) NOT NULL PRIMARY KEY,
  uid varchar(255) REFERENCES users,
  bid VARCHAR(255) REFERENCES posts
);

CREATE TABLE favorited_blogs (
  favorite_id varchar(255) NOT NULL PRIMARY KEY,
  uid varchar(255) REFERENCES users,
  bid VARCHAR(255) REFERENCES posts
);
