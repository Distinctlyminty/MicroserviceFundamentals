const express = require("express");
const bodyParser = require("body-parser");
const vehicleService = require("./services/vehicleService");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();

app.use(bodyParser.json());

// load the test data
vehicleService.seed();

// configure swagger
require('./swagger')(app);

// healthcheck endpoint
/**
 * @swagger
 * /:
 *   get:
 *     summary: Healthcheck endpoint.
 *     description: Returns a message indicating that the service is running.
 *     responses:
 *       200:
 *         description: A message indicating that the service is running.
 */
app.get("/", (req, res) => {
  res.status(200).send("Vehicle Service");
});

// register the route handlers

/**
 * @swagger
 * components:
 *   schemas:
 *     Vehicle:
 *       type: object
 *       required:
 *         - registrationNumber
 *         - make
 *         - model
 *         - rentalPrice
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the vehicle.
 *         registrationNumber:
 *           type: string
 *           description: The registration number of the vehicle.
 *         make:
 *           type: string
 *           description: The make of the vehicle.
 *         model:
 *           type: string
 *           description: The model of the vehicle.
 *         rentalPrice:
 *           type: number
 *           description: The rental price of the vehicle per day.
 *       example:
 *         registrationNumber: ABC123
 *         make: Toyota
 *         model: Corolla
 *         rentalPrice: 50
 */

/**
 * @swagger
 * /vehicle:
 *   post:
 *     summary: Create a new vehicle.
 *     tags: [Vehicle]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       201:
 *         description: The created vehicle.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       500:
 *         description: Internal server error.
 */
app.post("/vehicle", vehicleService.createVehicle);

/**
 * @swagger
 * /vehicle/{id}:
 *   put:
 *     summary: Update a vehicle by ID.
 *     tags: [Vehicle]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the vehicle to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       200:
 *         description: The updated vehicle.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       500:
 *         description: Internal server error.
 */
app.put("/vehicle/:id", vehicleService.updateVehicle);

/**
 * @swagger
 * /vehicle/{id}:
 *   delete:
 *     summary: Delete a vehicle by ID.
 *     tags: [Vehicle]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the vehicle to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No content.
 *       500:
 *         description: Internal server error.
 */
app.delete("/vehicle/:id", vehicleService.deleteVehicle);

/**
 * @swagger
 * /vehicle/{id}:
 *   get:
 *     summary: Get a vehicle by ID.
 *     tags: [Vehicle]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the vehicle to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested vehicle.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: Vehicle not found.
 *       500:
 *         description: Internal server error.
 */
app.get("/vehicle/:id", vehicleService.getVehicle);

/**
 * @swagger
 * /vehicles:
 *   get:
 *     summary: Get all vehicles.
 *     tags: [Vehicle]
 *     responses:
 *       200:
 *         description: A list of vehicles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: Vehicles not found.
 *       500:
 *         description: Internal server error.
 */
app.get("/vehicles", vehicleService.getAllVehicles);

/**
 * @swagger
 * /vehicle/search/{registrationNumber}:
 *   get:
 *     summary: Search for a vehicle by registration number.
 *     tags: [Vehicle]
 *     parameters:
 *       - in: path
 *         name: registrationNumber
 *         required: true
 *         description: Registration number of the vehicle to search for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested vehicle.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: Vehicle not found.
 *       500:
 *         description: Internal server error.
 */
app.get(
  "/vehicle/search/:registrationNumber",
  vehicleService.searchVehicleByRegistrationNumber
);

/**
 * @swagger
 * /vehicles/price/{maxPrice}:
 *   get:
 *     summary: Get all vehicles with a rental price less than or equal to the specified maximum price.
 *     tags: [Vehicle]
 *     parameters:
 *       - in: path
 *         name: maxPrice
 *         required: true
 *         description: Maximum rental price of the vehicles to retrieve.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: A list of vehicles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: Vehicles not found.
 *       500:
 *         description: Internal server error.
 */
app.get(
  "/vehicles/price/:maxPrice",
  vehicleService.lookupVehiclesByMaxRentalPrice
);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Vehicle Service is running on port ${PORT}`);
});
