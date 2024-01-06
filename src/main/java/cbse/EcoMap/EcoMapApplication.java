package cbse.EcoMap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


import cbse.EcoMap.security.SecurityConfig;

@ComponentScan(basePackages = {"cbse.EcoMap", "cbse.EcoMap.security", "cbse.EcoMap.client", "cbse.EcoMap.filters"})
@EnableJpaRepositories(basePackages = "cbse.EcoMap.repository")
@SpringBootApplication
public class EcoMapApplication {
    public static void main(String[] args) {
        SpringApplication.run(EcoMapApplication.class, args);
    }
    
}
