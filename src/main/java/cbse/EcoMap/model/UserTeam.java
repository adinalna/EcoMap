package cbse.EcoMap.model;

import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import java.time.Instant;

import jakarta.persistence.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_team")
public class UserTeam {
	
	@Id
    @GeneratedValue
    private Long id;
	@NonNull
	@ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;
    @NonNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;  
    @NonNull
    private String role;   
    @Builder.Default
    private Instant date_created = Instant.now();	
    
    
    public void setTeam(Team team) {
        this.team = team;
//        team.getUserTeams().add(this); 
    }
    
}
