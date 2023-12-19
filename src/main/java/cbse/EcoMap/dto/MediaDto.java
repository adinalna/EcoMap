package cbse.EcoMap.dto;

import java.time.Instant;

import cbse.EcoMap.model.Media;
import lombok.Data;

@Data
public class MediaDto {
    private Long id;
    private String path;
    private String mediaType;
    private double locationX;
    private double locationY;
    private Instant dateCreated;

    public MediaDto(Media media) {
        this.id = media.getId();
        this.path = media.getPath();
        this.mediaType = media.getMediaType();
        this.locationX = media.getLocationX();
        this.locationY = media.getLocationY();
        this.dateCreated = media.getDateCreated();
    }
}