## Getting Started

This project supports both development and production modes.

- Development mode uses mock data and doesn't connect to the backend.
- Production mode is intended to work alongside the tcs-backend project.

### Prerequisites

- Node.js must be installed.
- Docker must be installed to run the Keycloak authentication server.

### Installing Dependencies

Before running the application, install the necessary dependencies:

```bash
cd tcs-frontend

npm install
```

### Authentication (Keycloak)

To enable login and secure routes, you must start the Keycloak container.

```bash

cd tcs-frontend

docker build -t keycloak -f keycloak.Dockerfile .

docker run --name keycloak -d -p 8081:8081 keycloak

```

### Running in Development Mode

There are two development options:

1. Realistic images with a smaller dataset

   This mode provides a more polished visual experience, but uses a limited dataset.

   ```bash
   cd tcs-frontend

   npm run dev
   ```

2. Canvas-generated images with a larger dataset

   This version uses canvas-generated images and includes a more extensive dataset.

   ```bash
   cd tcs-frontend

   npm run dev-c
   ```

### Running in Production Mode

- Ensure the tcs-backend application is up and running.
- This mode is optimized and connects to the actual backend services.

  ```bash
  cd tcs-frontend

  npm run preview
  ```

## Troubleshooting

If Node.js processes hang or don’t shut down properly, you can force-stop them:

```bash
cd tcs-frontend

npm run stop-node
```
