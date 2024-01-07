package cbse.EcoMap.dto;

import cbse.EcoMap.model.Tag;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TagDto {
    private Long id;
    private String titleKey;
    private String titleValue;
    private String group;

    public TagDto(Tag tag) {
        this.id = tag.getId();
        this.titleKey = tag.getTitleKey();
        this.titleValue = tag.getTitleValue();
        this.group = tag.getTagGroup().getTitle();
    }
}