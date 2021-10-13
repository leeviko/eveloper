CREATE DATABASE IF NOT EXISTS eveloper;

CREATE TABLE IF NOT EXISTS users (
  uid varchar(255) NOT NULL PRIMARY KEY,
  email varchar(100) NOT NULL UNIQUE,
  name varchar(50) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  description varchar(255) NOT NULL DEFAULT 'There is nothing here',
  createdat varchar(255) NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS posts (
  bid varchar(255) NOT NULL PRIMARY KEY,
  uid varchar(255) REFERENCES users,
  title varchar(30) NOT NULL,
  content text NOT NULL,
  createdat DATE NOT NULL DEFAULT now(),
  tags text[]
);

CREATE TABLE IF NOT EXISTS post_likes (
  vote_id varchar(255) NOT NULL PRIMARY KEY,
  uid varchar(255) REFERENCES users,
  bid VARCHAR(255) REFERENCES posts
);

CREATE TABLE IF NOT EXISTS favorited_blogs (
  favorite_id varchar(255) NOT NULL PRIMARY KEY,
  uid varchar(255) REFERENCES users,
  bid VARCHAR(255) REFERENCES posts
);

CREATE TABLE IF NOT EXISTS post_comments (
  comment_id varchar(255) primary key,
  uid varchar(255) REFERENCES users,
  bid varchar(255) REFERENCES posts,
  comment varchar(255) not null,
  createdat date NOT NULL DEFAULT CURRENT_DATE,
  name varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_follows (
  follow_id varchar(255) primary key,
  follower_id varchar(255) REFERENCES users(uid),
  followed_id varchar(255) REFERENCES users(uid)
);