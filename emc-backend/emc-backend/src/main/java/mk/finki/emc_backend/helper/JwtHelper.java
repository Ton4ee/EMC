package mk.finki.emc_backend.helper;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import mk.finki.emc_backend.constants.JwtConstants;
import mk.finki.emc_backend.domain.Role;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtHelper {

    public String generateToken(String username, Role role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role.name())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + JwtConstants.EXPIRATION))
                .signWith(Keys.hmacShaKeyFor(JwtConstants.SECRET.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    public Claims parse(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(JwtConstants.SECRET.getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
