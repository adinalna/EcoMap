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
    private String password;
    
    @NonNull
    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;

    @ManyToMany
    @JoinTable(
        name = "user_team",
        joinColumns = @JoinColumn(name = "user_id"), 
        inverseJoinColumns = @JoinColumn(name = "team_id") 
    )
    private Set<Team> teams; 
    
    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<UserTeam> userTeams = new HashSet<>();
    
    @ManyToMany
    @JoinTable(
        name = "user_cleanup",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "cleanup_id")
    )
    private Set<Cleanup> cleanups;
//    
//    @Builder.Default
//    @ManyToMany(cascade = { CascadeType.MERGE, CascadeType.PERSIST })
//    @JoinTable(
//        name = "user_cleanup",
//        joinColumns = @JoinColumn(name = "user_id"),
//        inverseJoinColumns = @JoinColumn(name = "cleanup_id")
//    )
//    private Set<Cleanup> cleanups = new HashSet<>();
    
//    @Builder.Default
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    private Set<UserCleanup> userCleanups = new HashSet<>();
    
    @OneToMany(mappedBy = "user")
    private Set<Litter> litters;
    
    public void setCountry(Country country) {
        if (this.country != null) {
            this.country.getUsers().remove(this);
        }
        this.country = country;
        if (country != null) {
            country.getUsers().add(this);
        }
    }
}