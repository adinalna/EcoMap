package cbse.EcoMap.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tag_group")
public class TagGroup {
    @Id
    @GeneratedValue
    private Long id;
    private String title;

    @OneToMany(mappedBy = "tagGroup")
    private Set<Tag> tags;
}
