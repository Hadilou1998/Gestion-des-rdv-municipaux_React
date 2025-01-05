const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
      console.log("Token manquant.");
      return res.status(403).json({ message: "Token manquant" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
          console.log("Token invalide :", err.message);
          return res.status(403).json({ message: "Token invalide" });
      }

      req.user = user; // Ajouter les infos de l'utilisateur pour la suite
      next();
  });
};

module.exports = authMiddleware;