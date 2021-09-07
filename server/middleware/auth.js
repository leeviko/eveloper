const auth = (req, res, next) => {
  const sessUser = req.session.user;

  if(!sessUser) {
    return res.status(401).json([{ msg: "You need to be logged in" }]);
  }

  next();
} 

module.exports = auth;