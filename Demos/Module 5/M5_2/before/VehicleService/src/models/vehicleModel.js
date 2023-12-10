const { v4: uuidv4 } = require('uuid');

/**
 * @swagger
 * components:
 *   schemas:
 *     Vehicle:
 *       type: object
 *       required:
 *         - id
 *         - registrationNumber
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated id of the vehicle
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
 *         id: 3fa85f64-5717-4562-b3fc-2c963f66afa6
 *         registrationNumber: ABC123
 *         make: Toyota
 *         model: Camry
 *         year: 2020
 *         rentalPrice: 50
 */
class Vehicle {
  
  
}

module.exports = Vehicle;