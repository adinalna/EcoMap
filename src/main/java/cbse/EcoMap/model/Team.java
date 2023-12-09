package cbse.EcoMap.model;

import lombok.Builder;
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
@Table(name = "teams")
public class Team {

    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String name;
    private String country;
    private Instant date_created = Instant.now();


    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL)
    private Set<UserTeam> userTeams;

    
    public Team(String name, String country) {
        this.name = name;
        this.country = country;
    }
}