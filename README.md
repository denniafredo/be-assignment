# Payment App

This is a payment application built with Fastify and PostgreSQL.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- Docker
- Docker Compose

## Getting Started

To get the project up and running, follow these steps:

1. **Clone the repository to your local machine:**

    ```
    git clone https://github.com/your-username/payment-app.git
    ```

2. **Navigate into the project directory:**

    ```
    cd payment-app
    ```

3. **Create a `.env` file in the root of the project and add the following environment variables:**

    ```
    DATABASE_URL=postgresql://postgres:root@postgres:5432/concreteai
    ```

    Replace `postgres:root@postgres:5432/concreteai` with your PostgreSQL connection URL.

4. **Build and start the Docker containers using Docker Compose:**

    ```
    docker-compose up --build
    ```

    This command will build and start the Fastify and PostgreSQL containers defined in the `docker-compose.yml` file.

5. **Once the containers are running, you can access the API documentation at [http://localhost:3000/documentation](http://localhost:3000/documentation).**

## Additional Information

- The Fastify server will be running on port 3000 by default. You can access the API endpoints at [http://localhost:3000](http://localhost:3000).
- The PostgreSQL database will be exposed on port 5432. You can connect to it using your preferred database client with the provided connection URL.

## Stopping the Application

To stop the application and shut down the Docker containers, press `Ctrl + C` in the terminal where you ran `docker-compose up`. Then run the following command to remove the containers:

```
docker-compose down
