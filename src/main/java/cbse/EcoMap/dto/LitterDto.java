package cbse.EcoMap.dto;

import java.time.Instant;
import java.util.Set;
import java.util.stream.Collectors;

import cbse.EcoMap.model.Litter;
import cbse.EcoMap.model.User;
import cbse.EcoMap.dto.MediaDto;
import lombok.Data;

@Data
public class LitterDto {
    private Long id;
    private Boolean pickedUp;
    private Instant dateCreated;
	private String user;
	private Integer country;
    private Set<MediaDto> media;
    private Set<TagDto> tags; 

    public LitterDto(Litter litter) {
    	this.id = litter.getId();
        this.pickedUp = litter.getPickedUp();
        this.dateCreated = litter.getDateCreated();
        this.user = litter.getUser().getName();
        this.country = litter.getCountryId();
        this.media = litter.getMedia().stream().map(MediaDto::new).collect(Collectors.toSet());
        this.tags = litter.getTags().stream().map(TagDto::new).collect(Collectors.toSet());
    }
}