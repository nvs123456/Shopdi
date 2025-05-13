FROM node:20 AS frontend
WORKDIR /app/shopdi-web
COPY /shopdi-web/package*.json ./
RUN npm install
COPY ./shopdi-web .
RUN npm run build

FROM maven:latest AS backend-build
# FROM ubuntu:22.04
WORKDIR /app/shopdi-api
COPY /shopdi-api/pom.xml ./

RUN mvn dependency:go-offline
COPY /shopdi-api/ .

WORKDIR /app/shopdi-api/src/main/resources/dist
COPY --from=frontend /app/shopdi-web/dist .
# RUN ls -la /app/shopdi-api/src/main/resources
# RUN echo "Building the backend"
WORKDIR /app/shopdi-api
RUN mvn clean package -DskipTests
# ENTRYPOINT ["echo", "Backend build complete."]


FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=backend-build /app/shopdi-api/src/main/resources/ .
COPY --from=backend-build /app/shopdi-api/target/shopdi-api-0.0.1-SNAPSHOT.jar ./shopdi-api.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "shopdi-api.jar"]