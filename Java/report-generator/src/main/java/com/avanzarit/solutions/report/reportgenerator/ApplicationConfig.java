package com.avanzarit.solutions.report.reportgenerator;

import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.stereotype.Component;

@Component
public class ApplicationConfig extends ResourceConfig {
    public ApplicationConfig() {
        registerEndpoints();
    }
    private void registerEndpoints() {
         register(GenerateReportComponent.class);
    }
}