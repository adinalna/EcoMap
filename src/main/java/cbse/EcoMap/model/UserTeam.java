package cbse.EcoMap.model;

import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_team")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@SequenceGenerator(name = "user_team_seq", sequenceName = "user_team_id_seq", allocationSize = 1)
public class UserTeam {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_team_seq")
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
        team.getUserTeams().add(this);
    }

    public void setUser(User user) {
        this.user = user;
        user.getUserTeams().add(this);
    }
}