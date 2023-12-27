package cbse.EcoMap.dto;

import cbse.EcoMap.model.Tag;
import lombok.Data;

@Data
public class TagDto {
    private Long id;
    private String titleKey;
    private String titleValue;
    private int count;
    private String group;

    public TagDto(Tag tag) {
        this.id = tag.getId();
        this.titleKey = tag.getTitleKey();
        this.titleValue = tag.getTitleValue();
        this.group = tag.getTagGroup().getTitle();
    }
}