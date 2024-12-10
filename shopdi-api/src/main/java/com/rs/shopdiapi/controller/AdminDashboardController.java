package com.rs.shopdiapi.controller;

import org.apache.hc.core5.http.impl.bootstrap.HttpServer;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import co.elastic.clients.elasticsearch.nodes.Http;
import jakarta.servlet.http.HttpServletRequest;

@RestController
public class AdminDashboardController {
    // @GetMapping(value="{path:^(?!assets).*}/**")
    @GetMapping(value="/{path:login|forget|buyer|"+
    "register|seller|admin|"+
    "profile|editprofile|orderhistory|orders|order|cart|product|shop|search|review|category}/**")
    public Resource index() {

        return new ClassPathResource("dist/index.html");
    }
    @GetMapping(value="/")
    public Resource getindex() {

        return new ClassPathResource("dist/index.html");
    }
    
}
