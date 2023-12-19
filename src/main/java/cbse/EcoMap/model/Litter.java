package cbse.EcoMap.model;

import com.fasterxml.jackson.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Objects;
import java.util.Set;

import jakarta.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "litter")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Litter {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "picked_up", nullable = false, columnDefinition = "boolean default false")
    private Boolean pickedUp;

    @Builder.Default
    @Column(name = "date_created")
    private Instant dateCreated = Instant.now();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "litter", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Media> media;

    @ManyToMany
    @JoinTable(
            name = "litter_tag",
            joinColumns = @JoinColumn(name = "litter_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Litter litter = (Litter) o;
        return Objects.equals(id, litter.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
