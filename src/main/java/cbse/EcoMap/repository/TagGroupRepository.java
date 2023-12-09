package cbse.EcoMap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import cbse.EcoMap.model.TagGroup;

@Repository
public interface TagGroupRepository extends JpaRepository<TagGroup, Long> {
}
