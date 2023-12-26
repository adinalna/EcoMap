package cbse.EcoMap.dto;

import lombok.Data;

@Data
public class TeamDto {
    private Long id; // Assuming you want to expose the ID
    private String name;
    private Boolean isPublic;
    private String uniqueIdentifier; // This can be null for public teams
    // Other attributes can be added as needed
}
