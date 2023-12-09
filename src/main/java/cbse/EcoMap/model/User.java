package cbse.EcoMap.model;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import java.time.Instant;

import jakarta.persistence.*;

@Data
@Builder  
@NoArgsConstructor 
@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue
    private Long id;
    
    @Builder.Default
    private Instant date_created = Instant.now();

    @NonNull
    private String name;

    @NonNull
    private String email;

    @NonNull
    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    // Manually create a constructor with the necessary fields
    public User(Long id, Instant date_created, String name, String email, Country country, Team team) {
        this.id = id;
        this.date_created = date_created;
        this.name = name;
        this.email = email;
        this.country = country;
        this.team = team;
    }
}