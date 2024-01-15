# Node.js Command Line Application

This command-line application is developed using NodeJS and TypeScript with PostgreSQL integration. The application focuses on fetching GitHub user information, storing it in a PostgreSQL database, and providing various command-line options for querying and managing user data.

## Table of Contents

- [Features](#features)
- [Dependencies](#dependencies)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Commands](#commands)
- [Error Handling and Potential Issues](#error-handling-and-potential-issues)


## Features

1. **Fetch GitHub User Information:**
   - Retrieve information about a specified GitHub user using the GitHub API.
   - Store user data and programming languages.


2. **List Users and Filtering:**
   - View a list of all users stored in the database.
   - Filter users based on their location.
   - Filter users based on the programming language they are associated with.



## Dependencies

- [NodeJS](https://nodejs.org/en)
- [Typescript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [pg-promise](https://github.com/vitaly-t/pg-promise) for PostgreSQL database access.
- [db-migrate](https://db-migrate.readthedocs.io/en/latest/) for database migrations

## Setup

1. **Install the Application Dependencies:**
    - Execute the following commands to set up the application.

    ```bash
    npm install
    ```
    

2. **Decrypt PostgreSQL Password:**
    - Decrypt the PostgreSQL password using [Ansible Vault](https://docs.ansible.com/ansible/2.9/user_guide/vault.html). (application_postgres.yml)

    ```yaml
    password_postgres: !vault |
      $ANSIBLE_VAULT;1.1;AES256
      [Encrypted Password Here]
    ```

    - To decrypt the PostgreSQL password execute the following command
    
    ```bash
     ansible-vault decrypt <file-with-encrypted-password> --vault-password-file=<file-with-vault-key>.key
     ```
    
    - To view the decrypted password execute the following command
    
    ```bash
     cat <file-with-encrypted-password> 
    ```

3. **Database Configuration:**
   - Define PostgreSQL connection details in a `.env` file.

   ```dotenv
   POSTGRES_HOST=db
   POSTGRES_PORT=5432
   POSTGRES_DB=your_database
   POSTGRES_USER=your_user
   POSTGRES_PASSWORD=your_password
   ```

4. **Running Migrations:**
    - Execute the following command to run migrations in the database.

    ```bash
    db-migrate up
    ```
    
5. **Running the Application:**
    - Execute the following commands to set up and run the application.

    ```bash
    npm run start -- <command> <arguments>
    ```

6. **Running the ESlint and Prettier:**
    - Execute the following commands.

    ```bash
    npm run prettier
    npm run lint
    ```

    

## Commands:

- `fetch <username>`: Fetch GitHub user information and store it in the database.
- `list`: Display all users stored in the database.
- `listByLocation <location>`: List users from a given location stored in the database.
- `listLanguages <username>`: Query and store programming languages of a user in the database.



## Error Handling and Potential Issues:

The application is designed to handle errors gracefully. However, you may encounter the following issues:
 
-   Network Issues:

    Ensure a stable internet connection for successful communication with the GitHub API.
 
- GitHub API Rate Limiting:

    Be mindful of GitHub API rate limits. If exceeded, you might need to wait to increase limits.

- Database Connection:

    Verify PostgreSQL connection details in the .env file and ensure the database is running.

- Command-Line Arguments:

    Provide valid command-line arguments to avoid errors.

- Security:

    Always secure sensitive information such as database credentials and decryption keys.

- Error Logging:

    Review error messages and logs for troubleshooting. The application logs errors using the provided logger.


