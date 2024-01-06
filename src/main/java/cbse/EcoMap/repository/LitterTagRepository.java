package cbse.EcoMap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

import cbse.EcoMap.model.LitterTag;
import cbse.EcoMap.model.Tag;
import cbse.EcoMap.model.User;

public interface LitterTagRepository extends JpaRepository<LitterTag, Long> {

    @Query("SELECT lt.tag FROM LitterTag lt GROUP BY lt.tag ORDER BY COUNT(lt.tag) DESC")
    List<Tag> findMostUsedTag();

    @Query("SELECT lt.tag FROM LitterTag lt WHERE lt.dateCreated >= :oneWeekAgo GROUP BY lt.tag ORDER BY COUNT(lt.tag) DESC")
    List<Tag> findMostUsedTagLastWeek(@Param("oneWeekAgo") Instant oneWeekAgo);

    @Query("SELECT lt.tag FROM LitterTag lt WHERE lt.dateCreated >= :oneMonthAgo GROUP BY lt.tag ORDER BY COUNT(lt.tag) DESC")
    List<Tag> findMostUsedTagLastMonth(@Param("oneMonthAgo") Instant oneMonthAgo);

    @Query("SELECT lt.tag FROM LitterTag lt WHERE lt.dateCreated >= :oneYearAgo GROUP BY lt.tag ORDER BY COUNT(lt.tag) DESC")
    List<Tag> findMostUsedTagLastYear(@Param("oneYearAgo") Instant oneYearAgo);
    
    @Query("SELECT DISTINCT lt.tag FROM LitterTag lt WHERE lt.litter.user.id = :userId")
    List<Tag> findDistinctTagsByUserId(@Param("userId") Long userId);
    
    @Query("SELECT t FROM Tag t WHERE NOT EXISTS " +
            "(SELECT lt FROM LitterTag lt WHERE lt.tag = t AND lt.litter.id = :litterId)")
     List<Tag> findUnusedTagsByLitterId(@Param("litterId") Long litterId);
}
