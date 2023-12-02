package cbse.EcoMap.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.Set;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "team")
public class Team {

    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String name;
    private String country;

    @OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    private Set<User> users;
    
    public Team(String name, String country) {
        this.name = name;
        this.country = country;
    }
    
    
}