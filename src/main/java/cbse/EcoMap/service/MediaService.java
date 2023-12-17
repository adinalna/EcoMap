package cbse.EcoMap.service;

import cbse.EcoMap.model.Media;
import cbse.EcoMap.model.Litter;
import cbse.EcoMap.repository.MediaRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

@Service
public class MediaService {

    private final MediaRepository mediaRepository;
    private final LitterService litterService; 

    @Autowired
    public MediaService(MediaRepository mediaRepository, LitterService litterService) {
        this.mediaRepository = mediaRepository;
        this.litterService = litterService;
    }

    public Media createMedia(Media media) {
        if (isValidMedia(media)) {
            if (media.getLitter() == null) {
                // If litter is not provided, create a new one
                Litter newLitter = litterService.createLitter(new Litter()); 
                media.setLitter(newLitter);
            }
            return mediaRepository.save(media);
        } else {
            throw new IllegalArgumentException("Invalid media. Path and media_type cannot be empty or null.");
        }
    }

    public List<Media> createMediaBatch(List<Media> mediaList) {
        if (mediaList.stream().anyMatch(media -> !isValidMedia(media))) {
            throw new IllegalArgumentException("Invalid media. Path and media_type cannot be empty or null.");
        }

        // If litter is not provided, create a new one for each media
        mediaList.forEach(media -> {
            if (media.getLitter() == null) {
                Litter newLitter = litterService.createLitter(new Litter()); // Assuming createLitter is implemented in LitterService
                media.setLitter(newLitter);
            }
        });

        return mediaRepository.saveAll(mediaList);
    }

    private boolean isValidMedia(Media media) {
        return !ObjectUtils.isEmpty(media.getPath()) &&
               !ObjectUtils.isEmpty(media.getMediaType());
    }
}
