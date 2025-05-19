package mk.finki.emc_backend.web.rest;

import lombok.RequiredArgsConstructor;
import mk.finki.emc_backend.domain.*;
import mk.finki.emc_backend.repository.UserRepository;
import mk.finki.emc_backend.helper.JwtHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final JwtHelper jwtHelper;

    @PostMapping("/register")
    public void register(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        userRepo.save(User.builder()
                .username(username)
                .password(encoder.encode(password))
                .role(Role.ADMIN)                 // <‑‑ make yourself admin for testing
                .build());
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Bad credentials"));

        if (!encoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Bad credentials");
        }

        String token = jwtHelper.generateToken(username, user.getRole());
        return Map.of("token", token, "role", user.getRole().name());
    }
}
