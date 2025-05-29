# Use the official Keycloak image as the base image
FROM quay.io/keycloak/keycloak:26.2.5

# Set environment variables for Keycloak
ENV KC_BOOTSTRAP_ADMIN_USERNAME=admin
ENV KC_BOOTSTRAP_ADMIN_PASSWORD=admin
ENV KC_HTTP_PORT=8081

# If configuring Keycloak with db
#ENV KC_DB=postgres
#ENV KC_DB_URL=jdbc:postgresql://host.docker.internal:5432/keycloak
#ENV KC_DB_USERNAME=postgres
#ENV KC_DB_PASSWORD=postgrespassword

# Copy the realm export file into the container
COPY realm-export.json /opt/keycloak/data/import/

# Expose necessary ports
EXPOSE 8081:8081

# Run Keycloak in development mode
CMD ["start-dev", "--import-realm"]
