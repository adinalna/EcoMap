package cbse.EcoMap.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tag_group")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@SequenceGenerator(name = "tag_group_seq", sequenceName = "tag_group_id_seq", allocationSize = 1)
public class TagGroup {
    @Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tag_group_seq")
    private Long id;
    
    private String title;

    @OneToMany(mappedBy = "tagGroup")
    private Set<Tag> tags;
}
