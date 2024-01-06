package cbse.EcoMap.model;

import com.fasterxml.jackson.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Objects;

import jakarta.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "media")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@SequenceGenerator(name = "media_seq", sequenceName = "media_id_seq", allocationSize = 1)
public class Media {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "media_seq")
    private Long id;

    @Column(name = "path")
    private String path;

    @Column(name = "media_type")
    private String mediaType;

    @Column(name = "location_x")
    private double locationX;

    @Column(name = "location_y")
    private double locationY;

    @Builder.Default
    @Column(name = "date_created")
    private Instant dateCreated = Instant.now();

    @ManyToOne
    @JoinColumn(name = "litter_id", nullable = true)
    @JsonBackReference
    private Litter litter;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Media media = (Media) o;
        return Objects.equals(id, media.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
