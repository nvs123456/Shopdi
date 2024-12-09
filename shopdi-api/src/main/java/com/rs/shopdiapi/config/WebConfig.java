package com.rs.shopdiapi.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;
import java.io.IOException;
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/dist/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver(){
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
                        if (resourcePath.equals("/")) {
                            return new ClassPathResource("dist/index.html");
                        }
                        Resource resource = location.createRelative(resourcePath);
                        System.out.println("resource: " + resource.getURI());
                        return resource.exists() && resource.isReadable() ? resource
                                : new ClassPathResource("dist/index.html");
                    }
                });
    }
    
}
