package cbse.EcoMap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import cbse.EcoMap.model.Country;
import cbse.EcoMap.model.Team;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {
	Country findByName(String name);
}

