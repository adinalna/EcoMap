package cbse.EcoMap.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import jakarta.persistence.*;
import java.time.Instant;

@Data
@NoArgsConstructor
@Entity
@Table(name = "country")
public class Country {

    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    private Instant date_created = Instant.now();
    private String name;
    private int xp_score;

    // Constructor with name parameter
    public Country(String name) {
        this.name = name;
    }
}
