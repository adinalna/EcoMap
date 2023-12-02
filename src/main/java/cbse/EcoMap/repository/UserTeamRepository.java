package cbse.EcoMap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import cbse.EcoMap.model.UserTeam;

@Repository
public interface UserTeamRepository extends JpaRepository<UserTeam, Long> {
    
    // You can add custom query methods here if needed
}
