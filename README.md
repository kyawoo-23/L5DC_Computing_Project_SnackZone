# Snack Zone Project

Welcome to the Snack Zone project! This repository contains the source code for both the customer-facing application (client), the admin dashboard (admin), the central schema and models (schema-central), and the database SQL files (database).

## Live website

- **client**: https://kko-cp-snack-zone.vercel.app/
- **admin**: https://kko-cp-snack-zone-admin.vercel.app/login

## Project Structure

- **client**: The client folder contains the project for the customer side of the Snack Zone application. It is built using Next.js.

- **admin**: The admin folder contains the admin dashboard for managing the Snack Zone application. Also built using Next.js.

- **schema-central**: This folder contains the central schema and models used by both the client and admin projects. It utilizes Prisma.

- **database**: The database folder contains the exported SQL files for the Snack Zone application.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/snack-zone-project.git
   ```

2. **Navigate to the project root:**

   ```bash
   cd snack-zone-project
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

   Before you begin, make sure you have the following installed on your machine:

   - [Node.js](https://nodejs.org/) (version 18 or later)
   - [npm](https://www.npmjs.com/) (Node.js package manager)

4. **Start the development servers:**

   - _Admin Dashboard:_

     ```bash
     npm run startAdmin
     ```

   - _Client Application:_

     ```bash
     npm run startClient
     ```

   - _Prisma Studio (Schema Central):_

     ```bash
     npm run startStudio
     ```

   - _All Together:_

     ```bash
     npm run start
     ```

   _Note: The `start` script will run all three projects simultaneously and logging might not works_
