package cbse.EcoMap.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import cbse.EcoMap.model.Litter;

@Repository
public interface LitterRepository extends JpaRepository<Litter, Long> {
	@Query("SELECT l FROM Litter l LEFT JOIN FETCH l.media m WHERE l.user.id = :userId")
    List<Litter> findAllByUserId(Long userId, Sort sort);
	
	@Query("SELECT l FROM Litter l LEFT JOIN FETCH l.media")
	List<Litter> findAllWithMedia(Sort sort);
}
