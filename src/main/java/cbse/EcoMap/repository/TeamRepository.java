package cbse.EcoMap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import cbse.EcoMap.model.Team;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    Team findByName(String name);
}
