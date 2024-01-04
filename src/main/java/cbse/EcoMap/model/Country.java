package cbse.EcoMap.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "country")
public class Country {

    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    private Instant date_created = Instant.now();
    private String name;
    @Min(0)
    private int xp_score;

    @OneToMany(mappedBy = "country")
    private Set<Team> teams;

    @OneToMany(mappedBy = "country")
    private Set<User> users = new HashSet<>(); // Initialize with an empty HashSet

    // Constructor to initialize the users field
    public Country(String name, int xp_score) {
        this.name = name;
        this.xp_score = xp_score;
        this.users = new HashSet<>();
    }
}
