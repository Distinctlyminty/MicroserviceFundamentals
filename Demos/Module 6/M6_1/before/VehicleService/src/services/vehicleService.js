const Vehicle = require("../models/vehicleModel");
const seedData = require("../data/seedData");

const vehicleData = [];

 function seed() {
  vehicleData.push(...seedData);
}

async function createVehicle(req, res) {
  try {
    const vehicle = new Vehicle(req.body.registrationNumber, req.body.make, req.body.model, req.body.year, req.body.rentalPrice);
    vehicleData.push(vehicle);
    res.status(201).send(vehicle);
  } catch (err) {
    res.status(500).send(err);
  } 
}

async function updateVehicle(req, res) {
  try {
    const index = vehicleData.findIndex(vehicle => vehicle.id === req.params.id);
    if (index !== -1) {
      vehicleData[index] = {...vehicleData[index], ...req.body};
      res.send(vehicleData[index]);
    } else {
      res.status(404).send({message: 'Vehicle not found'});
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

function deleteVehicle(req, res) {
  try {
    const index = vehicleData.findIndex(vehicle => vehicle.id === req.params.id);
    if (index !== -1) {
      vehicleData.splice(index, 1);
      res.status(204).send();
    } else {
      res.status(404).send({message: 'Vehicle not found'});
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

function getVehicle(req, res) {
  try {
    const vehicle = vehicleData.find(vehicle => vehicle.id === req.params.id);
    if (!vehicle) {
      res.status(404).send("Vehicle not found");
    } else {
      res.send(vehicle);
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

function getAllVehicles(req, res) {
  try {
    const vehicles = vehicleData;
    if (!vehicles || vehicles.length === 0) {
      res.status(404).send("Vehicles not found");
    } else {
      res.send(vehicles);
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

function searchVehicleByRegistrationNumber(req, res) {
  try {
    const vehicle = vehicleData.find(vehicle => vehicle.registrationNumber === req.params.registrationNumber);
    if (!vehicle) {
      res.status(404).send("Vehicle not found");
    } else {
      res.send(vehicle);
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

function lookupVehiclesByMaxRentalPrice(req, res) {
  try {
    const vehicles = vehicleData.filter(vehicle => vehicle.rentalPrice <= req.params.maxPrice);
    if (!vehicles || vehicles.length === 0) {
      res.status(404).send("Vehicles not found");
    } else {
      res.send(vehicles);
    }
  } catch (err) {
    res.status(500).send(err);
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

