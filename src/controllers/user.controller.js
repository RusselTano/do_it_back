import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existinguser = await User.findOne({ email });
    if (existinguser) return res.json({ message: "Email deja utiliser ❌" });

    await User.create({ name, email, password });
    
    res.json({ message: "Compte cree avec success ✅" });
  } catch (err) {
    res.json({ message: "Erreur serveur : ", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Utilisateur introuvable." });

    // Verifier si le mot de passe est correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Mot de passe incorrect." });

    // Créer le token
    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    // Créer le refresh token
    const refreshToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
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
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

export const logout = (req, res) => {
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

export const profile = async (req, res) => {
  res.json({ message: "Authentification réussie", user: req.user });
};
