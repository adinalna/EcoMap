package cbse.EcoMap.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

import java.time.Instant;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "litter")
public class Litter {
    @Id
    @GeneratedValue
    private Long id;

    @Builder.Default
    private Instant date_created = Instant.now();

    private String title;
    private String description;
    private String media;
    private String media_type;

    @ManyToOne
    @JoinColumn(name = "user_id") // This is the foreign key column
    private User user;

    @ManyToMany
    @JoinTable(
            name = "litter_tag",
            joinColumns = @JoinColumn(name = "litter_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags;
}
