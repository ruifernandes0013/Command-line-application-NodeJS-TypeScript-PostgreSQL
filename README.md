# Node.js Command Line Application

This command-line application is developed using NodeJS and TypeScript with PostgreSQL integration. The application focuses on fetching GitHub user information, storing it in a PostgreSQL database, and providing various command-line options for querying and managing user data.

## Table of Contents

- [Features](#features)
- [Dependencies](#dependencies)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Commands](#commands)


## Features

1. **Fetch GitHub User Information:**
   - Retrieve information about a specified GitHub user using the GitHub API.
   - Store user data in one or more PostgreSQL database tables.

2. **Database Integration:**
   - Utilizes PostgreSQL for storing and managing GitHub user data.
   - Database setup provided in `docker-compose.yml`.

3. **Command-Line Options:**
   - `fetch <username>`: Fetch and store user information.
   - `list`: Display all users already stored in the database.
   - `listByLocation <location>`: List users from a given location.
   - `listLanguages <username>`: Query and store programming languages for a user.

## Dependencies

- NodeJS
- Typescript
- PostgreSQL
- Docker
- Axios
- Dotenv
- [pg-promise](https://github.com/vitaly-t/pg-promise) for PostgreSQL database access.
- Ts
- Yargs
- db

## Setup

1. **Database Configuration:**
   - Define PostgreSQL connection details in a `.env` file.

   ```dotenv
   POSTGRES_HOST=db
   POSTGRES_PORT=5432
   POSTGRES_DB=your_database
   POSTGRES_USER=your_user
   POSTGRES_PASSWORD=your_password
   ```


2. **Decrypt PostgreSQL Password:**
    - Decrypt the PostgreSQL password using Ansible Vault. (application_postgres.yml)

    ```yaml
    password_postgres: !vault |
      $ANSIBLE_VAULT;1.1;AES256
      [Encrypted Password Here]
    ```

3. **Running Migrations:**
    - Execute the following command to run migrations in the database.

    ```bash
    db-migrate up
    ```
    
4. **Running the Application:**
    - Execute the following commands to set up and run the application.

    ```bash
    npm install
    npm run start -- <command> <arguments>
    ```

## Commands:

- `fetch <username>`: Fetch GitHub user information and store it in the database.
- `list`: Display all users stored in the database.
- `listByLocation <location>`: List users from a given location stored in the database.
- `listLanguages <username>`: Query and store programming languages of a user in the database.



