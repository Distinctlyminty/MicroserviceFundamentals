const express = require('express');
const bodyParser = require('body-parser');
const Vehicle = require('./models/vehicleModel');
const seedData = require('./data/seedData');
const dbClient =  require('./dbClient');


const app = express();

app.use(bodyParser.json());

async function seed() {
   await dbClient.connect();
    await Vehicle.deleteMany();
    await Vehicle.insertMany(seedData);
    console.log('Test data inserted successfully');
    await dbClient.disconnect();
}

// load the test data
seed();

// configure swagger
require('./swagger')(app);

app.get('/', (req, res) => {
    res.status(200).send('Vehicle Service');
  });

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
        await dbClient.connect();
        const vehicle = new Vehicle(req.body);
        await vehicle.save();
        res.status(201).send(vehicle);
    } catch (err) {
        res.status(500).send(err);
    } finally {
        await dbClient.disconnect();
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
        await dbClient.connect();
        const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(vehicle);
    } catch (err) {
        res.status(500).send(err);
    } finally {
        await dbClient.disconnect();
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
        await dbClient.connect();
        await Vehicle.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err);
    } finally {     
        await dbClient.disconnect();
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
        await dbClient.connect();
        const vehicle = await Vehicle.findById(req.params.id);
        res.send(vehicle);
    } catch (err) {
        res.status(500).send(err);
    } finally {
        await dbClient.disconnect();
    }
});

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
        await dbClient.connect();
        const vehicles = await Vehicle.find();
        res.send(vehicles);
    } catch (err) {
        res.status(500).send(err);
    } finally {
        await dbClient.disconnect();
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
        await dbClient.connect();
        const vehicle = await Vehicle.findOne({ registrationNumber: req.params.registrationNumber });
        res.send(vehicle);
    } catch (err) {
        res.status(500).send(err);
    } finally { 
        await dbClient.disconnect();
    }
});

// Lookup vehicles by max rental price
/**
 * @swagger
 * /vehicles/price/{maxPrice}:
 *   get:
 *     summary: Get a list of vehicles with rental price less than or equal to the specified maximum price
 *     parameters:
 *       - in: path
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
app.get('/vehicles/price/:maxPrice', async (req, res) => {
    try {
        await dbClient.connect();
        const vehicles = await Vehicle.find({ rentalPrice: { $lte: req.params.maxPrice } });
        res.send(vehicles);
    } catch (err) {
        res.status(500).send(err);
    } finally {
        await dbClient.disconnect();
    }
});

// Lookup vehicles by rental price range
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
        await dbClient.connect();
        const vehicles = await Vehicle.find();
        res.send(vehicles);
    } catch (err) {
        res.status(500).send(err);
    } finally {
        await dbClient.disconnect();
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Vehicle Service is running on port ${PORT}`);
});
