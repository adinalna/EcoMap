package cbse.EcoMap.service;

import cbse.EcoMap.model.Litter;
import cbse.EcoMap.repository.LitterRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LitterService {

    private final LitterRepository litterRepository;

    @Autowired
    public LitterService(LitterRepository litterRepository) {
        this.litterRepository = litterRepository;
    }

    public Litter createLitter(Litter litter) {
        return litterRepository.save(litter);
    }
}
