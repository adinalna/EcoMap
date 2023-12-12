package cbse.EcoMap.model;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "teams")
public class Team {

    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String name;
    private String logo; 
    private Boolean isPublic; 
    @Builder.Default
    private Instant date_created = Instant.now();
    
    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL)
    private Set<UserTeam> userTeams;
}