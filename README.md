## Getting Started

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

There are three ways to run the project during development:

1. Realistic images with a smaller dataset

   Uses JSON Server (disconnected from backend) with polished, realistic images but a limited dataset.

   ```bash
   cd tcs-frontend

   npm run dev-m
   ```

2. Canvas-generated images with a larger dataset

   Uses JSON Server (disconnected from backend) with canvas-generated images and a more extensive dataset.

   ```bash
   cd tcs-frontend

   npm run dev-m-c
   ```

3. Connect directly to the backend

   Runs the frontend connected to the real backend API.

   ```bash
   cd tcs-frontend

   npm run dev
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
