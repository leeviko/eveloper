# Eveloper
#### Dev.to clone (Built for practise purposes)
This is still in progress

![Alt Text](Eveloper_demo.gif)

## Features
- [x] Registration and authentication
- [x] Create a post
- [x] Search for users and posts
- [x] Like post
- [x] Comment post
- [x] Delete post
- [x] Follow user
- [x] Update user info
- [ ] Search for posts by tag, user or popularity

## Stack
### Front End
- React
- Redux
- react-router
- react-markdown
### Back End
- Node.js
- Express
- PostgreSQL
- SQLite3 for session storage

## Getting started

1. First clone the repo:
  ```
  git clone https://github.com/leeviko/eveloper.git
  ```

2. Then navigate to client folder and install all dependencies:
  ```
  npm install
  ```
  Do the same for the server folder.
  
3. To create the database, copy everything from database.sql and paste it to your postgres terminal
4. Then write your db credentials & sess secret to .env and you should be good to go
5. To start the server, type ```npm run server``` and to start the front end, type ```npm start``` from their root directories

