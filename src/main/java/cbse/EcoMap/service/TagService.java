package cbse.EcoMap.service;

import java.time.Instant;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cbse.EcoMap.model.Tag;
import cbse.EcoMap.dto.TagDto;
import cbse.EcoMap.repository.TagRepository;
import cbse.EcoMap.repository.LitterTagRepository;

@Service
public class TagService {
    private final TagRepository tagRepository;
    private final LitterTagRepository litterTagRepository;

    @Autowired
    public TagService(TagRepository tagRepository, LitterTagRepository litterTagRepository) {
        this.tagRepository = tagRepository;
        this.litterTagRepository = litterTagRepository;
    }
	
    public List<TagDto> findtAllTags() {
    	List<Tag>tags = tagRepository.findAll();
        return tags.stream()
                .map(TagDto::new)
                .collect(Collectors.toList());
    }
    
    public List<TagDto> findTagsByUserId(Long userId) {
    	List<Tag> litterTags = litterTagRepository.findDistinctTagsByUserId(userId);
        return litterTags.stream()
                .map(TagDto::new)
                .collect(Collectors.toList());
    }
    
    public List<TagDto> findUnusedTagsByLitterId(Long litterId) {
    	List<Tag> litterTags = litterTagRepository.findUnusedTagsByLitterId(litterId);
        return litterTags.stream()
                .map(TagDto::new)
                .collect(Collectors.toList());
    }
    
    public List<TagDto> findMostUsedTag() {
    	List<Tag> litterTags = litterTagRepository.findMostUsedTag();
    	return litterTags.stream()
                .map(TagDto::new)
                .collect(Collectors.toList());
    }

    public List<TagDto> findMostUsedTagLastWeek() {
        Instant oneWeekAgo = Instant.now().minus(7, ChronoUnit.DAYS);
        List<Tag> litterTags = litterTagRepository.findMostUsedTagLastWeek(oneWeekAgo);
        return litterTags.stream()
                .map(TagDto::new)
                .collect(Collectors.toList());
    }

    public List<TagDto> findMostUsedTagLastMonth() {
    	ZonedDateTime oneMonthAgo = ZonedDateTime.now(ZoneOffset.UTC).minusMonths(1);
        Instant oneMonthAgoInstant = oneMonthAgo.toInstant();
        List<Tag> litterTags = litterTagRepository.findMostUsedTagLastMonth(oneMonthAgoInstant);
        return litterTags.stream()
                .map(TagDto::new)
                .collect(Collectors.toList());
    }

    public List<TagDto> findMostUsedTagLastYear() {
        ZonedDateTime oneYearAgo = ZonedDateTime.now(ZoneOffset.UTC).minusYears(1);
        Instant oneYearAgoInstant = oneYearAgo.toInstant();
        List<Tag> litterTags = litterTagRepository.findMostUsedTagLastYear(oneYearAgoInstant);
		return litterTags.stream()
                .map(TagDto::new)
                .collect(Collectors.toList());
}
    
    public Map<String, List<TagDto>> findMostUsedTagsAll() {
        Map<String, List<TagDto>> mostUsedTagsAll = new HashMap<>();
        
        mostUsedTagsAll.put("week", findMostUsedTagLastWeek());
        mostUsedTagsAll.put("month", findMostUsedTagLastMonth());
        mostUsedTagsAll.put("year", findMostUsedTagLastYear());
        mostUsedTagsAll.put("ever", findMostUsedTag()); 
        
        return mostUsedTagsAll;
    }

}