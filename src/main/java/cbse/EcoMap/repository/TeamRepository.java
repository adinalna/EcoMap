package cbse.EcoMap.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import cbse.EcoMap.model.Team;
import cbse.EcoMap.model.UserTeam;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    List<Team> findByName(String name);
    boolean existsByName(String name);
    boolean existsByUniqueIdentifier(String uniqueIdentifier);
    Optional<Team> findByUniqueIdentifier(String uniqueIdentifier);
}


