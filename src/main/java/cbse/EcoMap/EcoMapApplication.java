package cbse.EcoMap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "cbse.EcoMap") 
@EnableJpaRepositories(basePackages = "cbse.EcoMap.repository")
public class EcoMapApplication {
    public static void main(String[] args) {
        SpringApplication.run(EcoMapApplication.class, args);
    }
}
