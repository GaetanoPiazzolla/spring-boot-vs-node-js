package gae.piaz.performance.controller;


import gae.piaz.performance.controller.dto.LoginDTO;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.TextCodec;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@RestController
@RequestMapping("/login")
public class LoginController {

    @PostMapping
    public ResponseEntity<String> login(@RequestBody @Valid LoginDTO request) {

        if(!request.getUsername().equals("username") && !request.getPassword().equals("password"))
        {
            return ResponseEntity.status(401).body("");
        }

        Date now = new Date();

        Instant in30min = ChronoUnit.MINUTES.addTo(now.toInstant(),30);

        String token = Jwts.builder()
                .setIssuer("ta")
                .setSubject("ta")
                .claim("username", request.getUsername())
                .setIssuedAt(now)
                .setExpiration(Date.from(in30min))
                .signWith(
                        SignatureAlgorithm.HS256, Base64.encodeBase64String("worldisfullofdevelopers".getBytes())
                )
                .compact();

        return ResponseEntity.ok(token);
    }

}
