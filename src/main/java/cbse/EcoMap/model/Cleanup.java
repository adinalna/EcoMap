package cbse.EcoMap.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.AllArgsConstructor;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cleanups")
public class Cleanup {

    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    private String name;
    private int location_x;
    private int location_y;
    private String image;
    private Boolean isPublic;
    private Instant date_created = Instant.now();

    @ManyToMany(mappedBy = "cleanups")
    private Set<User> users = new HashSet<>();
}
