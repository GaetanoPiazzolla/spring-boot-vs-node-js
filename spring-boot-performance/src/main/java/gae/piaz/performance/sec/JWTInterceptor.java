package gae.piaz.performance.sec;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JWTInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {

        try {
            String token = request.getHeader("authorization");
            token = token.substring(7);
            Jwts.parser()
                    .setSigningKey(Base64.encodeBase64String("worldisfullofdevelopers".getBytes()))
                    .parseClaimsJws(token);

        } catch (Exception e) {
            response.sendError(401);
            return false;
        }

        return true;

    }

} 