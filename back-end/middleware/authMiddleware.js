const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"]?.split(" ");
  if (!authHeader) return res.status(401).json({ message: "Token manquant" });

  jwt.verify(authHeader, process.env.JWT_SECRET, (error, user) => {
    if (error) return res.status(403).json({ message: "Token invalide" });
    req.user = user;
    next();
  });
};

module.exports = authMiddleware;