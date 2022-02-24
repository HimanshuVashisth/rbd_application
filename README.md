# rbd_application
NodeJs API using ExpressJS MySql Swagger Jest 

# Run application

`npm start`

# API Documentation

From Gary: https://app.swaggerhub.com/apis/SASIT/CnC/1.0.1-oas3

`http://localhost:3000/swagger-docs`

gitlab.com

# Versioning - Out of scope v1(KFC), v2(Pizza hut) probably

# Supported data formats
* Direct data formats: JSON
* Database data formats: SQL

# URI
* Endpoint: `http://localhost:3000/api/v1/healthcheck`, `http://localhost:3000/api/v1/healthcheck/{storeId}`, `http://localhost:3000/api/v1/order`
* Methods: GET
* Search criteria: By orderId and storeId 
* Request: Path parameters
* Response: Response body in JSON (OrderItem schema: status: READY with timestamp or null)
* HTTP status codes: 200, 404 & 501

# Security & Authentication options
* No Application security
* HTTPS - ???

# Scalability & Flexibility (Confirm with Gary)
* Requests per second --> about 1000 requests in a day
* Size of requests
* Load distribution
* Latency and response time
* API throttling: Usage by users in a particular time period.

# Logging, Monitoring and Error handling (Confirm with Gary)
* Create application.log file in project directory
* HTTP status codes: Anything other than 200 shall be considered error.
* Alarm when health check is not ok. - No 

# Testing, stability & Support
* Jest - Unit test for input validation

# Maintainability
* Applying patches and fixes
* Planning capacity
* Enhancing configuration management

# Stateless
* Expires: Request session expires after successful response.
* No caching or do not maintain state for healthcheck and GET order timestamp.

