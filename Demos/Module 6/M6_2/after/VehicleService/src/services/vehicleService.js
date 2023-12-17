const Vehicle = require("../models/vehicleModel");
const seedData = require("../data/seedData");
const dbClient = require("../dbClient");

async function seed() {
  await dbClient.connect();
  await Vehicle.deleteMany();
  await Vehicle.insertMany(seedData);
  console.log("Test data inserted successfully");
  await dbClient.disconnect();
}

async function createVehicle(req, res) {
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
}

async function updateVehicle(req, res) {
  try {
    await dbClient.connect();
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(vehicle);
  } catch (err) {
    res.status(500).send(err);
  } finally {
    await dbClient.disconnect();
  }
}

async function deleteVehicle(req, res) {
  try {
    await dbClient.connect();
    await Vehicle.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  } finally {
    await dbClient.disconnect();
  }
}

async function getVehicle(req, res) {
  try {
    await dbClient.connect();
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      res.status(404).send("Vehicle not found");
    } else {
      res.send(vehicle);
    }
  } catch (err) {
    res.status(500).send(err);
  } finally {
    await dbClient.disconnect();
  }
}

async function getAllVehicles(req, res) {
  try {
    await dbClient.connect();
    const vehicles = await Vehicle.find();
    if (!vehicles) {
      res.status(404).send("Vehicles not found");
    } else {
      res.send(vehicles);
    }
  } catch (err) {
    res.status(500).send(err);
  } finally {
    await dbClient.disconnect();
  }
}

async function searchVehicleByRegistrationNumber(req, res) {
  try {
    await dbClient.connect();
    const vehicle = await Vehicle.findOne({
      registrationNumber: req.params.registrationNumber,
    });
    if (!vehicle) {
      res.status(404).send("Vehicle not found");
    } else {
      res.send(vehicle);
    }
  } catch (err) {
    res.status(500).send(err);
  } finally {
    await dbClient.disconnect();
  }
}

async function lookupVehiclesByMaxRentalPrice(req, res) {
  try {
    await dbClient.connect();
    const vehicles = await Vehicle.find({
      rentalPrice: { $lte: req.params.maxPrice },
    });
    if (!vehicles) {
      res.status(404).send("Vehicles not found");
    } else {
      res.send(vehicles);
    }
  } catch (err) {
    res.status(500).send(err);
  } finally {
    await dbClient.disconnect();
  }
}

module.exports = {
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicle,
  getAllVehicles,
  searchVehicleByRegistrationNumber,
  lookupVehiclesByMaxRentalPrice,
  seed,
};
