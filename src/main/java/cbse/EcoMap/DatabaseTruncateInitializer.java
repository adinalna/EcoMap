//package cbse.EcoMap;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.stereotype.Component;
//
//@Component
//public class DatabaseTruncateInitializer implements CommandLineRunner {
//
//    private final JdbcTemplate jdbcTemplate;
//
//    @Autowired
//    public DatabaseTruncateInitializer(JdbcTemplate jdbcTemplate) {
//        this.jdbcTemplate = jdbcTemplate;
//    }
//
//    @Override
//    public void run(String... args) throws Exception {
//        truncateTables();
//    }
//
//    private void truncateTables() {
////        String[] tableNames = {"cleanups", "country", "litter", "litter_tag", "media", "tag", "tag_group", "teams", "user_cleanup", "user_team", "users"};
//        String[] tableNames = {"litter", "media", "country"};
//
//        for (String tableName : tableNames) {
//            String sql = "TRUNCATE TABLE " + tableName + " CASCADE";
//            jdbcTemplate.execute(sql);
//        }
//    }
//}
//
