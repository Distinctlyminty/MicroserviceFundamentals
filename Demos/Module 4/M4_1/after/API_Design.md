# API Design

### Vehicle Model
- Make : string
- Model : string
- Registration : string
- Year : number
- Price : number

### Endpoints

1. Create Vehicle
HTTP POST
URL: /vehicle
Request body: Vehicle entity

Response:   201: Vehicle created
            500: Application error

2. Update Vehicle
HTTP PUT
URL: /vehicle/:id
Request body: Vehicle entity

Response:   200: Vehicle updated
            500: Application error

3. Delete Vehicle
HTTP DELETE
URL: /vehicle/:id

Response:   200: OK
            500: Application error

4. Get Vehicle by ID
HTTP GET
URL: /vehicle/:id

Response:   200: Vehicle updated
            404: Vehicle not found
            500: Application error           

5. Get all Vehicles
HTTP GET
URL: /vehicles

Response:   200: A list of vehicles
            404: Vehicles not found
            500: Application error 

6. Get Vehicle by Registration Number
HTTP GET
URL: /vehicle/search/:registrationNumber

Response:   200: A vehicle
            404: Vehicle not found
            500: Application error 

7. Get Vehicles by Max Price
HTTP GET
URL: /vehicles/price/:maxPrice

Response:   200: A list of vehicles
            404: Vehicles not found
            500: Application error 