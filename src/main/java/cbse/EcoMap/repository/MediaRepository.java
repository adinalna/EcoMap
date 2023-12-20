package cbse.EcoMap.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import cbse.EcoMap.model.Media;

@Repository
public interface MediaRepository extends JpaRepository<Media, Long> {
}