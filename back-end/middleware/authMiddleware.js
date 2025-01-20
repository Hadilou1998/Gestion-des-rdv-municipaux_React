const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Accès non autorisé.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé.' });
        }

        req.user = { id: user.id, role: user.role }; // Ajoute l'utilisateur et son rôle à la requête
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Accès non autorisé.' });
    }
};

module.exports = authMiddleware;