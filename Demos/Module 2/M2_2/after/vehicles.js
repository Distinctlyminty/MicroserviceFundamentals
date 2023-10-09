// Import the HTTP module
const http = require('http');

// Define the static data store
const vehicles = [
    { id: 1, make: 'Tesla', model: 'Y', year: 2022, rentalPrice: 350 },
    { id: 2, make: 'Polestar', model: '2', year: 2024, rentalPrice: 410 },
    { id: 3, make: 'Ford Mustang', model: 'Mach-E', year: 2023, rentalPrice: 430 }
];

// Create the HTTP server
const server = http.createServer((req, res) => {
    // Respond to the GET request at the root URL
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(vehicles));
    } else {
        // Send a 404 response for any other request
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found\n');
    }
});

// Start the server and listen on port 3000
server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
