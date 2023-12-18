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
import jakarta.persistence.OneToMany;
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
    
    private Boolean picked_up;

    @Builder.Default
    private Instant date_created = Instant.now();

    @ManyToOne
    @JoinColumn(name = "user_id") 
    private User user;
    
    @OneToMany(mappedBy = "litter")
    private Set<Media> media;

    @ManyToMany
    @JoinTable(
            name = "litter_tag",
            joinColumns = @JoinColumn(name = "litter_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags;
}