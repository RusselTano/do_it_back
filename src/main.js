import dotenv from "dotenv";
import connectDB from "./config/connectDB.config.js";
import createApp from "./app.js";

dotenv.config(); 

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectDB(); 
    const app = await createApp();

    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`✅ documentation running on http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("❌ Erreur lors du démarrage du serveur :", error);
    process.exit(1);
  }
};

startServer(); 
