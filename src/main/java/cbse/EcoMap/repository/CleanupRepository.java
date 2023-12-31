package cbse.EcoMap.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import cbse.EcoMap.model.Cleanup;
import cbse.EcoMap.model.UserCleanup;

@Repository
public interface CleanupRepository extends JpaRepository<Cleanup, Long> {


}
