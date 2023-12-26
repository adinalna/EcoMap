package cbse.EcoMap.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cbse.EcoMap.dto.LitterTagDto;
import cbse.EcoMap.dto.TagDto;
import cbse.EcoMap.model.LitterTag;
import cbse.EcoMap.model.Tag;
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
    
    public Tag findMostUsedTag() {
       return litterTagRepository.findMostUsedTag();
    }

    public Tag findMostUsedTagLastWeek() {
        Instant oneWeekAgo = Instant.now().minus(7, ChronoUnit.DAYS);
        return litterTagRepository.findMostUsedTagLastWeek(oneWeekAgo);
    }

    public Tag findMostUsedTagLastMonth() {
        Instant oneMonthAgo = Instant.now().minus(1, ChronoUnit.MONTHS);
        return litterTagRepository.findMostUsedTagLastMonth(oneMonthAgo);
    }

    public Tag findMostUsedTagLastYear() {
        Instant oneYearAgo = Instant.now().minus(1, ChronoUnit.YEARS);
        return litterTagRepository.findMostUsedTagLastYear(oneYearAgo);
    }
    
    public Map<String, Tag> findMostUsedTagsAll() {
        Map<String, Tag> mostUsedTagsAll = new HashMap<>();
        mostUsedTagsAll.put("mostUsed", findMostUsedTag());
        mostUsedTagsAll.put("mostUsedLastWeek", findMostUsedTagLastWeek());
        mostUsedTagsAll.put("mostUsedLastMonth", findMostUsedTagLastMonth());
        mostUsedTagsAll.put("mostUsedLastYear", findMostUsedTagLastYear());
        return mostUsedTagsAll;
    }
}