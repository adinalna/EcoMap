package cbse.EcoMap.dto;

import cbse.EcoMap.model.Tag;
import lombok.Data;

@Data
public class TagDto {
    private Long id;
    private String title;
    private String group;

    public TagDto(Tag tag) {
        this.id = tag.getId();
        this.title = tag.getTitle();
        this.group = tag.getTagGroup().getTitle();
    }
}