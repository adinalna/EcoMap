package cbse.EcoMap.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.NonNull;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "teams")
public class Team {

    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    private String name;
    private Boolean isPublic; 
    private Instant date_created = Instant.now();
    
    // @ManyToOne
    // @JoinColumn(name = "country_id")
    // private Country country;

    @OneToMany(mappedBy = "team", cascade = CascadeType.REMOVE)
    @JsonIgnore 
    private Set<UserTeam> userTeams = new HashSet<>();
}

