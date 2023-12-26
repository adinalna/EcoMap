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
	private String country;
	private String state;
	private String city;
	private String postcode;
	private String address;
    private Set<MediaDto> media;
    private Set<LitterTagDto> litterTags; 

    public LitterDto(Litter litter) {
    	this.id = litter.getId();
        this.pickedUp = litter.getPickedUp();
        this.user = litter.getUser().getName();  
        this.media = litter.getMedia().stream().map(MediaDto::new).collect(Collectors.toSet());
        this.litterTags = litter.getLitterTags().stream().map(LitterTagDto::new).collect(Collectors.toSet());
        this.country = litter.getCountry().getName();
        this.state = litter.getState();
        this.city = litter.getCity();
        this.postcode = litter.getPostcode();
        this.address = litter.getAddress();
        this.dateCreated = litter.getDateCreated();
    }
}