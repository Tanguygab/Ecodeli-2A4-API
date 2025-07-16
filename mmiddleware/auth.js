import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '') || 
                     req.headers.token || 
                     req.headers.Token;
        if (!token) {
            return res.status(401).json({ message: 'Token manquant' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'votre_secret_key');
        const user = await User.findById(decoded.userId || decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Erreur d\'authentification:', error);
        return res.status(401).json({ message: 'Token invalide' });
    }
};
