# Koa/TypeScript Boilerplate Web API

Boilerplate code with Docker support for a Koa Web API with TypeScript, Jest, TSLint, and Dotenv.

### Update `.env` File

Environment configuration is controlled via the "dotenv" package. As such, you will need to (1) rename `.sample.env` to `.env` and (2) update the values on that file.

## Build Instructions

Clone the repo then run:

`npm install`

### Compile TypeScript to JavaScript

`npm run build:watch`

### Run the Test Server

`npm start`

The server is accessible at http://localhost:4000/

### Code Guidelines

- Routes 
  - Send request to controllers
- Controllers:
  - Validate input
  - Call services and/or routines (business logic operations)
    - No business logic in controllers (use services/routines)!
  - Respond via Koa's context
  - Catch any errors thrown by services/routines
- Services
  - Any business logic that is required to complete an operation
  - Use models, other services, routines
  - Throw exceptions
- Routines
  - Use models, services, other routines
  - Fail on any DB transaction failure
  - Throw exceptions
- Models
  - Handle all interactions with the database
  - Return raw data
- Helpers
  - Small independent functions
  - Everything can use helpers

### Commented Code

Search the project files for "TODO:" to find a list of items you can change.

The boilerplate comes with some ready-to-use code that is commented out by default. You can uncomment and adjust accordingly within your `src/index.ts` file. That code includes:

- CORS Considerations
- JWT Validation
- Rate Limiting

## Docker

`docker build -t boilerplate-typescript-koa .`

`docker run -p 8080:4000 boilerplate-typescript-koa`

The server is accessible at http://localhost:8080/
