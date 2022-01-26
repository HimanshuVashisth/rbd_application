# rbd_application
NodeJs API using ExpressJS MySql Swagger Jest 

# Run application

`npm start`

# API Documentation

`http://localhost:3000/swagger-docs`

# Versioning - Out of scope v1(KFC), v2(Pizza hut) probably

# Supported data formats
* Direct data formats: JSON
* Database data formats: SQL

# URI
* Endpoint: `http://localhost:3000/api/v1/order`
* Methods: GET
* Search criteria: By orderId and storeId 
* Request: Path parameters, Query parameters, Request body (Confirm with Sukriti - Cognizant)
* Response: Response body in JSON (status: READY/PENDING = null)
* HTTP status codes: 200
* Pagination: Out of scope
* Sorting: Out of scope

# Security & Authentication options
* HTTPS

# Scalability & Flexibility (Confirm with Gary)
* Requests per second --> about 1000 requests in a day
* Size of requests
* Load distribution
* Latency and response time
* API throttling: Usage by users in a particular time period.

# Monitoring and Error handling (Confirm with Gary)
* Create .log file by date in a directory
* HTTP status codes: Anything other than 200 shall be considered error.
* Alarm when health check is not ok.

# Testing, stability & Support
* Jest - Unit test for input validation

# Maintainability
* Applying patches and fixes
* Planning capacity
* Enhancing configuration management

# Stateless
* Expires: Request session expires after successful response

