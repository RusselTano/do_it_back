import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.cookies.accessToken; // ✅ Vérifie que `accessToken` est bien défini

  if (!token) {
    return res.status(401).json({ message: "Accès refusé, token manquant" });
  }

  try {
    // 📌 Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.tutor = decoded; // 📌 Ajoute les infos de l'utilisateur à la requête

    res.json({
      tutor: {
        tutorId: decoded.tutorId,
        tutorEmail: decoded.tutorEmail,
        tutorName: decoded.tutorName,
      },
    });
    next(); // Passe au middleware suivant
  } catch (err) {
    res.status(401).json({ message: "Token invalide" });
  }
};
