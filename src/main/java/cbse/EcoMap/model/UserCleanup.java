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
@Table(name = "user_cleanup")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@SequenceGenerator(name = "user_cleanup_seq", sequenceName = "user_cleanup_id_seq", allocationSize = 1)
public class UserCleanup {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_cleanup_seq")
    private Long id;

    @NonNull
    @ManyToOne
    @JoinColumn(name = "cleanup_id")
    private Cleanup cleanup;

    @NonNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @NonNull
    private String role;

    @Builder.Default
    private Instant date_created = Instant.now();
    
    public void setCleanup(Cleanup cleanup) {
        this.cleanup = cleanup;
        cleanup.getUserCleanups().add(this);
    }

    public void setUser(User user) {
        this.user = user;
        user.getUserCleanups().add(this);
    }
}
