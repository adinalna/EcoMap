package cbse.EcoMap.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "media")
public class Media {
    @Id
    @GeneratedValue
    private Long id;

    private String path;
    
    @Column(name = "media_type") 
    private String mediaType;

    @ManyToOne(optional = true) 
    @JoinColumn(name = "litter_id")
    private Litter litter;
}
