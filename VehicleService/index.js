const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Vehicle = require('./models/vehicleModel');
const seedData = require('./data/seedData');
const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://mongo:27017/vehicles', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
});

async function seed() {
    await Vehicle.deleteMany();
    await Vehicle.insertMany(seedData);
    console.log('Test data inserted successfully');
}

seed();

require('./swagger')(app);

// Create vehicle
/**
 * @swagger
 * /vehicle:
 *   post:
 *     summary: Create a new vehicle
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       201:
 *         description: The created vehicle
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       500:
 *         description: Internal server error
 */
app.post('/vehicle', async (req, res) => {
    try {
        const vehicle = new Vehicle(req.body);
        await vehicle.save();
        res.status(201).send(vehicle);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update vehicle
/**
 * @swagger
 * /vehicle/{id}:
 *   put:
 *     summary: Update a vehicle by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the vehicle to update
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
 *         description: The updated vehicle
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Internal server error
 */
app.put('/vehicle/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(vehicle);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Delete vehicle
/**
 * @swagger
 * /vehicle/{id}:
 *   delete:
 *     summary: Delete a vehicle by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the vehicle to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Vehicle deleted successfully
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Internal server error
 */
app.delete('/vehicle/:id', async (req, res) => {
    try {
        await Vehicle.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get vehicle
/**
 * @swagger
 * /vehicle/{id}:
 *   get:
 *     summary: Get a vehicle by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the vehicle to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested vehicle
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Internal server error
 */
app.get('/vehicle/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        res.send(vehicle);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get all vehicles
/**
 * @swagger
 * /vehicles:
 *   get:
 *     summary: Get all vehicles
 *     responses:
 *       200:
 *         description: A list of vehicles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 *       500:
 *         description: Internal server error
 */
app.get('/vehicles', async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.send(vehicles);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Search vehicle by registration number
/**
 * @swagger
 * /vehicle/search/{registrationNumber}:
 *   get:
 *     summary: Search for a vehicle by registration number
 *     parameters:
 *       - in: path
 *         name: registrationNumber
 *         required: true
 *         description: Registration number of the vehicle to search for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested vehicle
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Internal server error
 */
app.get('/vehicle/search/:registrationNumber', async (req, res) => {
    try {
        const vehicle = await Vehicle.findOne({ registrationNumber: req.params.registrationNumber });
        res.send(vehicle);
    } catch (err) {
        res.status(500).send(err);
    }
});

/**
 * @swagger
 * /vehicles/price:
 *   get:
 *     summary: Get a list of vehicles with rental prices within the specified range
 *     parameters:
 *       - in: query
 *         name: minPrice
 *         required: true
 *         description: Minimum rental price to filter vehicles by
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         required: true
 *         description: Maximum rental price to filter vehicles by
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: A list of vehicles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 *       500:
 *         description: Internal server error
 */
app.get('/vehicles/price', async (req, res) => {
    try {
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const vehicles = await Vehicle.find({ rentalPrice: { $gte: minPrice, $lte: maxPrice } });
        res.send(vehicles);
    } catch (err) {
        res.status(500).send(err);
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Vehicle Service is running on port ${PORT}`);
});
