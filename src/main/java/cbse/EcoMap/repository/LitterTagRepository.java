package cbse.EcoMap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.Instant;

import cbse.EcoMap.model.LitterTag;
import cbse.EcoMap.model.Tag;

public interface LitterTagRepository extends JpaRepository<LitterTag, Long> {

    @Query("SELECT lt.tag FROM LitterTag lt GROUP BY lt.tag ORDER BY COUNT(lt.tag) DESC")
    Tag findMostUsedTag();

    @Query("SELECT lt.tag FROM LitterTag lt WHERE lt.dateCreated >= :oneWeekAgo GROUP BY lt.tag ORDER BY COUNT(lt.tag) DESC")
    Tag findMostUsedTagLastWeek(@Param("oneWeekAgo") Instant oneWeekAgo);

    @Query("SELECT lt.tag FROM LitterTag lt WHERE lt.dateCreated >= :oneMonthAgo GROUP BY lt.tag ORDER BY COUNT(lt.tag) DESC")
    Tag findMostUsedTagLastMonth(@Param("oneMonthAgo") Instant oneMonthAgo);

    @Query("SELECT lt.tag FROM LitterTag lt WHERE lt.dateCreated >= :oneYearAgo GROUP BY lt.tag ORDER BY COUNT(lt.tag) DESC")
    Tag findMostUsedTagLastYear(@Param("oneYearAgo") Instant oneYearAgo);
}
