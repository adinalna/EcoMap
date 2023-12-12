package cbse.EcoMap.model;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import java.time.Instant;
import java.util.Set;
import java.util.HashSet;

import jakarta.persistence.*;

@Data
@Builder  
@NoArgsConstructor 
@AllArgsConstructor
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
    
    @ManyToMany
    @JoinTable(
        name = "user_cleanups",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "cleanup_id")
    )
    private Set<Cleanup> cleanups;
    
    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<UserTeam> userTeams = new HashSet<>();
}