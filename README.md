# ServiceHive

ServiceHive is a full-stack web application featuring a React/Vite frontend and a Node.js/Express backend. 

## Tech Stack

- **Frontend:** React, Vite, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript, MongoDB (Mongoose)
- **Containerization:** Docker & Docker Compose

## Prerequisites

- Node.js (v18 or higher recommended)
- Docker & Docker Compose (for containerized setup)
- MongoDB (if running locally without Docker)

## Getting Started

You can run this project either using Docker or locally on your machine.

### Option 1: Running with Docker (Recommended)

1. Make sure Docker is running.
2. From the root of the project, run:
   ```bash
   docker-compose up --build
   ```
3. The application will be available at:
   - **Client (Frontend):** http://localhost:5173
   - **Server (Backend):** http://localhost:5000

### Option 2: Running Locally

**1. Setup Server**
```bash
cd server
npm install
# Ensure you have a .env file configured with your environment variables (e.g., MongoDB URI, PORT)
npm run dev
```
The server will start at `http://localhost:5000`.

**2. Setup Client**
```bash
cd client
npm install
npm run dev
```
The client will start at `http://localhost:5173`.

## Documentation

For a detailed overview of the available endpoints, request/response formats, and authentication, please refer to the [API Documentation](./API_DOCUMENTATION.md).
