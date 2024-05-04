const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vehicle API",
      version: "1.0.0",
      description: "A simple Express API for managing vehicles",
    },
    servers: [
      {
        url: "https://vehicleservice.azurewebsites.net",
        description: "Production server",
      },
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
  },
  apis: ["./models/vehicleModel.js", "./index.js"],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
