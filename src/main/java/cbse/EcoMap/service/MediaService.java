package cbse.EcoMap.service;

import cbse.EcoMap.model.Media;
import cbse.EcoMap.repository.MediaRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

@Service
public class MediaService {

    private final MediaRepository mediaRepository;

    @Autowired
    public MediaService(MediaRepository mediaRepository) {
        this.mediaRepository = mediaRepository;
    }

    public Media createMedia(Media media) {
        if (isValidMedia(media)) {
            return mediaRepository.save(media);
        } else {
            throw new IllegalArgumentException("Invalid media. Path and media_type cannot be empty or null.");
        }
    }

    public List<Media> createMediaBatch(List<Media> mediaList) {
    	if (mediaList.stream().anyMatch(media -> !isValidMedia(media))) {
            throw new IllegalArgumentException("Invalid media. Path and media_type cannot be empty or null.");
        }

        return mediaRepository.saveAll(mediaList);
    }

    private boolean isValidMedia(Media media) {
        return !ObjectUtils.isEmpty(media.getPath()) &&
               !ObjectUtils.isEmpty(media.getMediaType());
    }
}