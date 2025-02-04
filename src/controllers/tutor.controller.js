import Tutor from "../models/tutor.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerTutor = async (req, res) => {
  try {
    const { tutorName, tutorEmail, password } = req.body;

    const existingTutor = await Tutor.findOne({ tutorEmail });
    if (existingTutor) return res.json({ message: "Email deja utiliser ❌" });

    await Tutor.create({ tutorName, tutorEmail, password });

    res.json({ message: "Compte cree avec success ✅" });
  } catch (err) {
    res.json({ message: "Erreur serveur : ", error: err.message });
  }
};

export const loginTutor = async (req, res) => {
  try {
    const { tutorEmail, password } = req.body;

    // Verifier si l'utilisateur existe
    const tutor = await Tutor.findOne({ tutorEmail });
    if (!tutor)
      return res.status(404).json({ message: "Utilisateur introuvable." });

    // Verifier si le mot de passe est correct
    const isPasswordCorrect = await bcrypt.compare(password, tutor.password);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Mot de passe incorrect." });

    // Créer le token
    const accessToken = jwt.sign(
      {
        tutorId: tutor._id,
        tutorEmail: tutor.tutorEmail,
        tutorName: tutor.tutorName,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    // Créer le refresh token
    const refreshToken = jwt.sign(
      {
        tutorId: tutor._id,
        tutorEmail: tutor.tutorEmail,
        tutorName: tutor.tutorName,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Stocker les tokens dans les cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      domain: "localhost",
      maxAge: 24 * 60 * 60 * 1000, // 1 jour
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      domain: "localhost",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
    });

    res.status(200).json({
      message: "Connexion réussie !",
      tutor: {
        id: tutor._id,
        tutorName: tutor.tutorName,
        tutorEmail: tutor.tutorEmail,
        role: tutor.role || "tutor",
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

export const logoutTutor = (req, res) => {
  try {
    res.clearCookie("accessToken", { httpOnly: true, secure: true });
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });
    res.status(200).json({ success: true, message: "Déconnexion réussie." });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la déconnexion.",
      error: err.message,
    });
  }
};

export const profileTutor = async (req, res) => {
  res.json({ message: "Profil de l'utilisateur", tutor: req.tutor });
};
