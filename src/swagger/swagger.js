import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
// import s from "../routes/tutor.routes"
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API des Tuteurs",
      version: "1.0.0",
      description: "Documentation de l'API pour les tuteurs",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token", // ⚠️ Remplace "token" par le nom réel de ton cookie !
        },
      },
    },
    security: [{ cookieAuth: [] }],
  },
  apis: ["./src/routes/tutor.routes.js"], // Chemin vers tes fichiers de routes
};

const swaggerSpec = swaggerJsdoc(options);

export default (app) => {
  app.use("/api-docs", swaggerUi.serve, (req, res, next) => {
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        withCredentials: true, // Permet d'envoyer les cookies
      },
    })(req, res, next);
  });
};
