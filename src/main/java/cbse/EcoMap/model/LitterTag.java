package cbse.EcoMap.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "litter_tag")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@SequenceGenerator(name = "litter_tag_seq", sequenceName = "litter_tag_id_seq", allocationSize = 1)
public class LitterTag {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "litter_tag_seq")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "litter_id")
    private Litter litter;

    @ManyToOne
    @JoinColumn(name = "tag_id")
    private Tag tag;

    @Builder.Default
    @Column(name = "date_created")
    private Instant dateCreated = Instant.now();
}
