import dotenv from "dotenv";
import connectDB from "./config/connectDB.config.js";
import createApp from "./app.js";

dotenv.config(); // ✅ Charger les variables d'environnement AVANT tout

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectDB(); 
    const app = await createApp(); 

    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erreur lors du démarrage du serveur :", error);
    process.exit(1);
  }
};

startServer(); // 🚀 Lance tout de manière asynchrone
