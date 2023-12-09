package cbse.EcoMap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import cbse.EcoMap.model.Tag;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
}
