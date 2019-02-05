# Koa/TypeScript Boilerplate Web API

Boilerplate code with Docker support for a Koa Web API with TypeScript, Jest, TSLint, and Dotenv.

### Local .env

Environment configuration is controlled via the "dotenv" package. As such, you will need to create a `.env` file for your local environment. Please contact a project admin for the most up-to-date local environment file.

## Build Instructions

Clone the repo then run:

`npm install`

### Compile TypeScript to JavaScript

`npm run build:watch`

### Run the Test Server

`npm start`

The server is accessible at http://localhost:4000/

## Docker

`docker build -t boilerplate-typescript-koa .`

`docker run -p 8080:4000 boilerplate-typescript-koa`

The server is accessible at http://localhost:8080/