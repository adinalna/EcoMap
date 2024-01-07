package cbse.EcoMap.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CountryLitterCountDto {
    private Integer countryId;
    private Long litterCount;
    private Long userCount;
    private String countryName;


    public CountryLitterCountDto(Integer countryId, String countryName, Long litterCount, Long userCount) {
        this.countryId = countryId;
        this.litterCount = litterCount;
        this.userCount = userCount;
        this.countryName = countryName;
    }

}
