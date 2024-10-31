package com.rs.shopdiapi.config;


import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI ShopdiOpenAPI(@Value("${open.api.title}") String title,
                                 @Value("${open.api.description}") String description,
                                 @Value("${open.api.version}") String version,
                                 @Value("${open.api.serverUrl}") String serverUrl) {
        return new OpenAPI()
                .info(new Info().title("Shopdi")
                        .description(description)
                        .version(version)
                        .license(new License().name("Apache 2.0").url("http://springdoc.org")))
                .servers(List.of(new Server().url(serverUrl).description("Main server")));
    }
}