//package cbse.EcoMap;
//
//import cbse.EcoMap.model.User;
//import cbse.EcoMap.model.Team;
//import cbse.EcoMap.repository.TeamRepository;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
//import java.util.Collections;
//import java.util.stream.Stream;
//
//@Component
//class Initializer implements CommandLineRunner {
//
//    private final TeamRepository repository;
//
//    public Initializer(TeamRepository repository) {
//        this.repository = repository;
//    }
//
//    @Override
//    public void run(String... strings) {
//    	Stream.of(
//    		    new Team("KL Litter Control", "Malaysia"),
//    		    new Team("Clean Selangor", "Malaysia"),
//    		    new Team("Melaka Bersih", "Malaysia"),
//    		    new Team("Eco Penang", "Malaysia")
//    		).forEach(repository::save);
//
//        Team malaysia = repository.findByName("KL Litter Control");
//
//        User teamMember = User.builder()
//                .name("John Doe") // Replace with appropriate user details
//                .email("joedoe@gmail.com")
//                .build();
//
//        malaysia.setUsers(Collections.singleton(teamMember));
//        repository.save(malaysia);
//        
//        repository.findAll().forEach(System.out::println);
//    }
//}