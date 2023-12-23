package cbse.EcoMap.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cbse.EcoMap.dto.TagDto;

import cbse.EcoMap.model.Tag;
import cbse.EcoMap.repository.TagRepository;

@Service
public class TagService {
    private final TagRepository tagRepository;

    @Autowired
    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }
	
    public List<TagDto> getAllTags() {
    	List<Tag>tags = tagRepository.findAll();
        return tags.stream()
                .map(TagDto::new)
                .collect(Collectors.toList());
    }
}