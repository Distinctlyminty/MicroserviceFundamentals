const Vehicle = require("../models/vehicleModel");

const seedData = [];

const makes = ["Toyota", "Honda", "Ford", "Chevrolet", "Nissan"];
const models = ["Camry", "Civic", "F-150", "Silverado", "Altima"];
const years = [2021, 2022, 2023, 2024];

for (let i = 0; i < 50; i++) {
  const make = makes[Math.floor(Math.random() * makes.length)];
  const model = models[Math.floor(Math.random() * models.length)];
  const year = years[Math.floor(Math.random() * years.length)];
  const rentalPrice = Math.floor(Math.random() * 351) + 150;
  const vehicle = new Vehicle(`ABC${i}`, make, model, year, rentalPrice);
  seedData.push(vehicle);
}

module.exports = seedData;
