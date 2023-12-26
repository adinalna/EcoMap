//package cbse.EcoMap;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.stereotype.Component;
//
//@Component
//public class SequenceInitializer implements CommandLineRunner {
//
//    private final JdbcTemplate jdbcTemplate;
//
//    @Autowired
//    public SequenceInitializer(JdbcTemplate jdbcTemplate) {
//        this.jdbcTemplate = jdbcTemplate;
//    }
//
//    @Override
//    public void run(String... args) throws Exception {
////        initializeSequences();
//        restartSequences();
//    }
//
//    private void initializeSequences() {
//        String[] tableNames = {"cleanups", "country", "litter", "litter_tag", "media", "tag", "tag_group", "teams", "user_cleanup", "user_team", "users"};
//
//        for (String tableName : tableNames) {
//            String sequenceName = tableName + "_id_seq";
//            String sql = "CREATE SEQUENCE " + sequenceName + " START WITH 100 INCREMENT BY 1 NO MAXVALUE NO MINVALUE;";
//            jdbcTemplate.execute(sql);
//        }
//    }
//
//    private void restartSequences() {
//        String[] tableNames = {"cleanups", "country", "litter", "media", "tag", "tag_group", "teams", "user_cleanup", "user_team", "users"};
//
//        for (String tableName : tableNames) {
//            String sequenceName = tableName + "_id_seq";
//            restartSequence(sequenceName, 1); 
//        }
//    }
//
//    private void restartSequence(String sequenceName, long restartValue) {
//        String sql = "ALTER SEQUENCE " + sequenceName + " RESTART WITH " + restartValue + ";";
//        jdbcTemplate.execute(sql);
//    }
//}
