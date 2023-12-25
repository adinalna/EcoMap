package cbse.EcoMap.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;

import java.time.Instant;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "country")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@SequenceGenerator(name = "country_seq", sequenceName = "country_id_seq", allocationSize = 1)
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "country_seq")
    private Long id;

    @NonNull
    private Instant date_created = Instant.now();
    private String name;
    @Min(0)
    private int xp_score;
    
    @OneToMany(mappedBy = "country")
    private Set<Litter> litters;
    
    @OneToMany(mappedBy = "country")
    private Set<Team> teams;
    
    
    @OneToMany(mappedBy = "country")
    private Set<User> users;
}