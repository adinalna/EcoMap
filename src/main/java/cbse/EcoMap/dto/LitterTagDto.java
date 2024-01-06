package cbse.EcoMap.dto;

import cbse.EcoMap.model.LitterTag;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor  
public class LitterTagDto {
    private Long id;
    private Long tagId;
    private String titleKey;
    private String titleValue;
    private int count;
    private String group;
    private Instant dateCreated;

    public LitterTagDto(LitterTag litterTag) {
        this.id = litterTag.getId();
        this.tagId = litterTag.getTag().getId();
        this.titleKey = litterTag.getTag().getTitleKey();
        this.titleValue = litterTag.getTag().getTitleValue();
        this.count = litterTag.getCount();
        this.group = litterTag.getTag().getTagGroup().getTitle();
        this.dateCreated = litterTag.getDateCreated();
    }
}