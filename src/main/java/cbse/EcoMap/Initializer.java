//package cbse.EcoMap;
//
//import cbse.EcoMap.model.User;
//import cbse.EcoMap.model.Team;
//import cbse.EcoMap.model.Country;
//import cbse.EcoMap.model.Litter;
//import cbse.EcoMap.model.Tag;
//import cbse.EcoMap.model.TagGroup;
//import cbse.EcoMap.repository.TeamRepository;
//import cbse.EcoMap.repository.CountryRepository;
//import cbse.EcoMap.repository.UserRepository;
//import cbse.EcoMap.repository.LitterRepository;
//import cbse.EcoMap.repository.TagRepository;
//import cbse.EcoMap.repository.TagGroupRepository;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
//import java.util.Collections;
//
//@Component
//class Initializer implements CommandLineRunner {
//
//    private final TeamRepository teamRepository;
//    private final CountryRepository countryRepository;
//    private final UserRepository userRepository;
//    private final LitterRepository litterRepository;
//    private final TagRepository tagRepository;
//    private final TagGroupRepository tagGroupRepository;
//
//    public Initializer(TeamRepository teamRepository, CountryRepository countryRepository,
//                       UserRepository userRepository, LitterRepository litterRepository,
//                       TagRepository tagRepository, TagGroupRepository tagGroupRepository) {
//        this.teamRepository = teamRepository;
//        this.countryRepository = countryRepository;
//        this.userRepository = userRepository;
//        this.litterRepository = litterRepository;
//        this.tagRepository = tagRepository;
//        this.tagGroupRepository = tagGroupRepository;
//    }
//
//    @Override
//    public void run(String... strings) {
//        // Create country
//        Country malaysiaCountry = countryRepository.save(new Country("Malaysia"));
//
//        // Create team
//        Team klLitterControl = teamRepository.save(new Team("KL Litter Control", malaysiaCountry));
//
//        // Create user
//        User user = userRepository.save(new User("John Doe", "joedoe@gmail.com", malaysiaCountry));
//
//        // Add user to the team
//        klLitterControl.setUsers(Collections.singleton(user));
//        teamRepository.save(klLitterControl);
//
//        // Create litter associated with the user
//        Litter litter = Litter.builder()
//                .title("Coke")
//                .description("Empty Coke Can")
//                .user(user)
//                .build();
//        litterRepository.save(litter);
//
//        Tag tag = tagRepository.save(Tag.builder().title("Soda Can").build());
//
//        TagGroup tagGroup = tagGroupRepository.save(TagGroup.builder().title("Aluminium ").build());
//
//        litter.setTags(Collections.singleton(tag));
//        litterRepository.save(litter);
//
//        // Add tag to tag group
//        tagGroup.setTags(Collections.singleton(tag));
//        tagGroupRepository.save(tagGroup);
//
//        teamRepository.findAll().forEach(System.out::println);
//        userRepository.findAll().forEach(System.out::println);
//        litterRepository.findAll().forEach(System.out::println);
//        tagRepository.findAll().forEach(System.out::println);
//        tagGroupRepository.findAll().forEach(System.out::println);
//    }
//}
