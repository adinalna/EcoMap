package cbse.EcoMap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import cbse.EcoMap.model.Cleanup;

@Repository
public interface CleanupRepository extends JpaRepository<Cleanup, Long> {
}
