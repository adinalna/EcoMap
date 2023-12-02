package cbse.EcoMap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import cbse.EcoMap.model.Country;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {
    
    // You can add custom query methods here if needed
}
