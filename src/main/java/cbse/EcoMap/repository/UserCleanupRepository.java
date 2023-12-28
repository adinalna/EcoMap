package cbse.EcoMap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import cbse.EcoMap.model.UserCleanup;

@Repository
public interface UserCleanupRepository extends JpaRepository<UserCleanup, Long> {
}
