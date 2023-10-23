const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Vehicle:
 *       type: object
 *       required:
 *         - registrationNumber
 *       properties:
 *         registrationNumber:
 *           type: string
 *           description: The registration number of the vehicle
 *         make:
 *           type: string
 *           description: The make of the vehicle
 *         model:
 *           type: string
 *           description: The model of the vehicle
 *         year:
 *           type: integer
 *           description: The year the vehicle was made
 *         rentalPrice:
 *           type: number
 *           description: The rental price of the vehicle
 *       example:
 *         registrationNumber: ABC123
 *         make: Toyota
 *         model: Camry
 *         year: 2020
 *         rentalPrice: 50
 */
const vehicleSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  make: String,
  model: String,
  year: Number,
  rentalPrice: Number,
});

module.exports = mongoose.model("vehicleModel", vehicleSchema);
