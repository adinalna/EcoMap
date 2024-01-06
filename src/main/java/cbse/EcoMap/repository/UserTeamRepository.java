package cbse.EcoMap.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import cbse.EcoMap.model.UserTeam;

@Repository
public interface UserTeamRepository extends JpaRepository<UserTeam, Long> {
	List<UserTeam> findByUserId(Long userId);
}

