# Vehicle Service Requirements

Below you will find a set of functional and non functional requirements for our Vehicle Service.  This is only an example of the kind of requirements that you will come across and is really just for reference.  In this course we're focusing on the funcional requirements.

## Functional Requirements

1. **Create Vehicle (CRUD)**
   - The system shall allow users to create new vehicle entities with the following information:
     - Vehicle make and model.
     - Registration number.
     - Manufacturing year.
     - Rental price per day.

2. **Update Vehicle (CRUD)**
   - Users shall be able to update existing vehicle information, including make, model, yeat, and price.

3. **Delete Vehicle (CRUD)**
   - Users will be able to delete vehicle records from the system.

4. **Retrieve Vehicle by ID**
   - The system shall provide an endpoint to retrieve vehicle details based on the records internal ID.

5. **Retrieve all Vehicles**
   - The system shall provide an endpoint to retrieve all vehicles.

6. **Retrieve Vehicle by Registration Number**
   - The system shall provide an endpoint to retrieve vehicle details based on the registration number.

7. **Retrieve Vehicles by Maximum Price**
   - Users shall have the capability to retrieve a list of vehicles with a maximum daily rental price.

## Non-Functional Requirements

1. **Performance**
   - The Vehicle Service shall be capable of handling a high volume of concurrent requests efficiently, ensuring low latency and quick response times.

2. **Scalability**
   - The system shall be designed to scale horizontally to accommodate increased load by adding more instances of the Vehicle Service.

4. **Data Consistency**
   - The system shall maintain data consistency by implementing appropriate transaction management for CRUD operations.

5. **Availability**
   - The Vehicle Service shall strive for high availability, ensuring that it is accessible to users 24/7 with minimal downtime.

6. **Logging and Monitoring**
   - The service shall maintain comprehensive logs for auditing and debugging purposes, and it shall integrate with monitoring tools to proactively identify and address issues.

7. **Data Validation**
   - Input data, especially during the creation and update of vehicle records, shall be validated to prevent data corruption and security vulnerabilities.

8. **Resilience**
   - The system shall be resilient to failures, with mechanisms in place to handle errors gracefully and recover from unexpected issues.

9. **API Documentation**
   - The Vehicle Service shall provide clear and up-to-date API documentation to assist client applications in making requests.

10. **Integration**
    - The service shall seamlessly integrate with other microservices and components of the vehicle rental application, such as the booking and payment services.

