//package cbse.EcoMap.web;
//
//import cbse.EcoMap.security.JwtTokenProvider;
//import cbse.EcoMap.dto.LoginDto;
//import cbse.EcoMap.dto.SignupDto;
//import cbse.EcoMap.response.LoginResponse;
//import cbse.EcoMap.security.UserDetailsImpl;
//import cbse.EcoMap.model.User;
//import cbse.EcoMap.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class AuthController {
//
//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    @Autowired
//    private JwtTokenProvider jwtTokenProvider;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @PostMapping("/login")
//    public ResponseEntity<?> authenticateUser(@RequestBody LoginDto loginDto) {
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword())
//        );
//
//        String token = jwtTokenProvider.createToken(authentication);
//        return ResponseEntity.ok(new LoginResponse(token));
//    }
//
//    @PostMapping("/signup")
//    public ResponseEntity<?> registerUser(@RequestBody SignupDto signupDto) {
//        // Check if the email is already in use
//        if (userRepository.existsByEmail(signupDto.getEmail())) {
//            return ResponseEntity.badRequest().body("Email address already in use");
//        }
//
//        // Create a new user
//        User user = new User();
//        user.setName(signupDto.getName());
//        user.setEmail(signupDto.getEmail());
//        user.setPassword(passwordEncoder.encode(signupDto.getPassword()));
//
//        // Save the user to the database
//        userRepository.save(user);
//
//        // Generate and return authentication token for the new user
//        UserDetails userDetails = loadUserByUsername(user.getEmail());
//        String token = jwtTokenProvider.createToken(((UserDetailsImpl) userDetails).getId(), ((SignupDto) userDetails).getName(), userDetails.getUsername());
//
//        return ResponseEntity.ok(new LoginResponse(token));
//    }
//
//    private UserDetails loadUserByUsername(String username) {
//        try {
//            User user = userRepository.findByEmail(username);
//
//            return UserDetailsImpl.build(user);
//        } catch (UsernameNotFoundException e) {
//            throw new UsernameNotFoundException("User not found with email: " + username);
//        }
//    }
//}


