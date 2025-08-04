const jwt = require('jsonwebtoken');
const JWT_SECRET = 'secret123';

module.exports = function (req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send({ error: "Access denied. No token provided." });

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch {
    res.status(401).send({ error: "Invalid token" });
  }
};
