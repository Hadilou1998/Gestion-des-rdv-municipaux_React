const roleMiddleware = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        console.log(`Accès interdit pour le rôle : ${req.user.role}`);
        return res.status(403).json({ message: "Accès interdit" });   
    }
    next();
}

module.exports = roleMiddleware;