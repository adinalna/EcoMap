package cbse.EcoMap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import cbse.EcoMap.model.Litter;

@Repository
public interface LitterRepository extends JpaRepository<Litter, Long> {
}
