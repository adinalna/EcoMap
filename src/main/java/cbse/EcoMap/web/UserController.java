package cbse.EcoMap.web;

import java.util.List;

import org.apache.el.stream.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import cbse.EcoMap.model.User;
import cbse.EcoMap.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;
    
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/list")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<List<User>> listUsers() {
        List<User> userList = userService.getAllUsers();
        return ResponseEntity.ok().body(userList);
    }
    
    @GetMapping("/specific")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<User> getUserById(@RequestParam("userId") Long userId) {
        List<User> userList = userService.getAllUsers();

        // Find the user with the specified ID
        User foundUser = null;
        for (User user : userList) {
            if (user.getId().equals(userId)) {
                foundUser = user;
                break;
            }
        }

        // Check if the user with the specified ID exists
        if (foundUser != null) {
            return ResponseEntity.ok().body(foundUser);
        } else {
            // Return an error response if the user with the specified ID is not found
            return ResponseEntity.notFound().build();
        }
    }
}