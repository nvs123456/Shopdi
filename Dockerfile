FROM node:20 AS frontend
WORKDIR /app/shopdi-web
COPY /shopdi-web/package*.json ./
RUN npm install
COPY ./shopdi-web .
RUN npm run build

FROM maven:latest AS backend-build
WORKDIR /app/shopdi-api
COPY /shopdi-api/ .

COPY --from=frontend /app/shopdi-web/dist /app/shopdi-api/src/main/resources
RUN ls -la /app/shopdi-api/src/main/resources
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=backend-build /app/shopdi-api/target/shopdi-api-0.0.1-SNAPSHOT.jar ./shopdi-api.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "shopdi-api.jar"]