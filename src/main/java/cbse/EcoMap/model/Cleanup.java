package cbse.EcoMap.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.AllArgsConstructor;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cleanups")@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@SequenceGenerator(name = "cleanups_seq", sequenceName = "cleanups_id_seq", allocationSize = 1)
public class Cleanup {

    @Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cleanups_seq")
    private Long id;

    @NonNull
    private String name;
    private String location_x;
    private String location_y;
    private String image;
    private Boolean isPublic;
    private Instant date_created = Instant.now();

    @OneToMany(mappedBy = "cleanup", cascade = CascadeType.ALL)
    private Set<UserCleanup> userCleanups;
}
