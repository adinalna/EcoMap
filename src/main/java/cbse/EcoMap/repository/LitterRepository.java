package cbse.EcoMap.repository;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import cbse.EcoMap.dto.LitterDto;
import cbse.EcoMap.model.Litter;

@Repository
public interface LitterRepository extends JpaRepository<Litter, Long> {
	@Query("SELECT l FROM Litter l LEFT JOIN FETCH l.media m WHERE l.user.id = :userId")
    List<Litter> findAllByUserId(Long userId);
	
	@Query("SELECT l FROM Litter l LEFT JOIN FETCH l.media")
	List<Litter> findAllWithMedia(Sort sort);
	
//	@Query("SELECT l FROM Litter l WHERE l.dateCreated BETWEEN :startDate AND :endDate")
//	List<Litter> findByDateCreatedBetween(LocalDateTime startDate, LocalDateTime endDate);
	
	@Query("SELECT l FROM Litter l WHERE l.dateCreated BETWEEN :startDate AND :endDate")
	List<Litter> findByDateCreatedBetween(Instant startDate, Instant endDate);
	
	


}

