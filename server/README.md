## API docs
   Method    |     Path      |     Desc      |    Access
------------ | ------------- | ------------- | ------------- 
POST | /api/auth | Authenticate user | Public
GET | /api/auth | Check if authenticated | Private
POST | /api/users | Create new user | Public
DELETE | /api/users/logout | Logout user | Private
POST | /api/posts | Create new post | Private
GET | /api/posts/:slug | Get single post by slug | Public
POST | /api/posts/:slug/like | Like post | Private
DELETE | api/posts/:slug/like | Unlike post | Private
...