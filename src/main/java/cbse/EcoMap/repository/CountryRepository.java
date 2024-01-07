package cbse.EcoMap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import cbse.EcoMap.model.Country;
import cbse.EcoMap.model.Team;

import java.util.List;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {
    @Query("SELECT c.name FROM Country c WHERE c.id = :countryId")
    String findCountryNameById(@Param("countryId") Long countryId);

    Country findByName(String name);
}

