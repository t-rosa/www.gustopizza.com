## Setting Up the Development Environment with Docker

We use Docker and Docker Compose to simplify the setup of the development environment. This allows you to run the application and all its associated services in containers without having to install any additional dependencies on your local machine.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Git](https://git-scm.com/downloads)

### Getting Started

1. Clone the repository on your local machine:

```bash
git clone https://github.com/t-rosa/www.gustopizza.com.git
cd www.gustopizza.com
```

2. Copy the `.env.example` file as `.env`:

```bash
cp .env.example .env
```

Modify the `.env` file by adding your own values for the environment variables if necessary.

3. Launch the application and associated services using Docker Compose:

```bash
docker compose up
```

This command will build the Docker images, create and start the containers for the application and the database. The application files are shared between your local machine and the container using bind mounts, enabling real-time development.

4. Access the application in your browser at [http://localhost:3000](http://localhost:3000).

### Useful Commands

- Running tests

```bash
docker compose run test
```

- Add a new dependency

```bash
docker exec web npm install <package_name>
```

- Stop containers and remove associated resources:

```bash
docker compose down
```
- Restart a specific service (e.g., `web`):

```bash
docker compose restart web
```

- Execute commands inside a specific container (e.g., `web`):

```bash
docker-compose exec web <command>
```

Replace `<command>` with the command you want to execute inside the container.
