package cbse.EcoMap.service;

import java.time.Instant;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

import cbse.EcoMap.dto.CountryLitterDto;
import cbse.EcoMap.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cbse.EcoMap.dto.LitterTagDto;
import cbse.EcoMap.dto.TagDto;
import cbse.EcoMap.repository.TagRepository;
import jakarta.persistence.EntityNotFoundException;
import cbse.EcoMap.repository.LitterRepository;
import cbse.EcoMap.repository.LitterTagRepository;

@Service
public class TagService {
    private final TagRepository tagRepository;
    private final LitterTagRepository litterTagRepository;
    private final LitterRepository litterRepository;

    @Autowired
    public TagService(TagRepository tagRepository, LitterTagRepository litterTagRepository, LitterRepository litterRepository) {
        this.tagRepository = tagRepository;
        this.litterTagRepository = litterTagRepository;
        this.litterRepository = litterRepository;
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
    
    public List<LitterTag> createMediaBatch(List<LitterTag> litterTagList) {
        return litterTagRepository.saveAll(litterTagList);
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

    public List<LitterTagDto> updateTagCountBatch(List<LitterTagDto> litterTagDtos) {
        List<LitterTag> updatedLitterTags = new ArrayList<>();

        for (LitterTagDto dto : litterTagDtos) {
            LitterTag existingTag = litterTagRepository.findById(dto.getId())
                    .orElseThrow(() -> new EntityNotFoundException("LitterTag not found: " + dto.getId()));
            existingTag.setCount(dto.getCount());
            updatedLitterTags.add(existingTag);
        }

        List<LitterTag> savedLitterTags = litterTagRepository.saveAll(updatedLitterTags);
        return savedLitterTags.stream()
                              .map(LitterTagDto::new)
                              .collect(Collectors.toList());
    }
    
    public void deleteTagBatch(List<Long> tagIds) {
        List<LitterTag> tagsToDelete = litterTagRepository.findAllById(tagIds);
        litterTagRepository.deleteAll(tagsToDelete);
    }
    
    public List<LitterTagDto> createLitterTags(Long litterId, List<TagDto> tagDtos) {
        Litter litter = litterRepository.findById(litterId)
                                        .orElseThrow(() -> new EntityNotFoundException("Litter not found"));

        List<LitterTag> litterTags = new ArrayList<>();
        for (TagDto tagDto : tagDtos) {
            Tag tag = tagRepository.findById(tagDto.getId())
                                   .orElseThrow(() -> new EntityNotFoundException("Tag not found"));

            LitterTag litterTag = LitterTag.builder()
                                           .litter(litter)
                                           .tag(tag)
                                           .count(1)
                                           .build();

            litterTags.add(litterTag);
        }

        return litterTagRepository.saveAll(litterTags).stream()
                                  .map(LitterTagDto::new)
                                  .collect(Collectors.toList());
    }

    public List<LitterTagDto> findAllLitterTags() {
        List<LitterTag> litterTags = litterTagRepository.findAll();
        return litterTags.stream()
                .map(LitterTagDto::new)
                .collect(Collectors.toList());
    }

}