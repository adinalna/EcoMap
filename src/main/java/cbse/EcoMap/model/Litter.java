package cbse.EcoMap.model;

import com.fasterxml.jackson.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

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
@SequenceGenerator(name = "litter_seq", sequenceName = "litter_id_seq", allocationSize = 1)
public class Litter {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "litter_seq")
    private Long id;

    @Column(name = "picked_up", nullable = false, columnDefinition = "boolean default false")
    private Boolean pickedUp;
    
    @ManyToOne
    @JoinColumn(name = "country_id", nullable = true)
    private Country country;

    @Column(name = "state", nullable = true)
    private String state;

    @Column(name = "city", nullable = true)
    private String city;

    @Column(name = "postcode", nullable = true)
    private String postcode;
    
    @Column(name = "address", nullable = true, columnDefinition = "TEXT")
    private String address;

    @Column(name = "request_response", nullable = true, columnDefinition = "TEXT")
    private String requestResponse;

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
