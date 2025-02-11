import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import apiRoutes from "./routes/index.js";
import swaggerDocs from "./swagger/swagger.js"; // Import Swagger


const createApp = async () => {
  const app = express();

  // ✅ Ajouter cookie-parser pour lire les cookies
  app.use(cookieParser());

  // Middlewares essentiels
  app.use(express.json()); // Pour parser les requêtes JSON

  // ✅ Activer CORS avec `credentials: true`
  app.use(
    cors({
      origin: process.env.CLIENT_URL, 
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );

  // Routes
  app.use(apiRoutes);


swaggerDocs(app); // Active Swagger

  return app;
};

export default createApp;
