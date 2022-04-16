package com.ultraeats.loginserv.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.ultraeats.loginserv.model.User;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtUtils {

	// Token utility class.

	private static final String SECRET = "SecretKey12345";
	private static final long EXPIRATION_TIME = 30000; // 30 seconds

	public String generateToken(Authentication authentication) { // Generating token based on available user details.
		User user = (User) authentication.getPrincipal();
		Date now = new Date(System.currentTimeMillis());
		Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);

		Map<String, Object> claims = new HashMap<String, Object>();
		claims.put("id", Long.toString(user.getUserId()));
		claims.put("username", user.getUsername());
		claims.put("password", user.getPassword());
		claims.put("email", user.getEmail());
		return Jwts.builder().setSubject(Long.toString(user.getUserId())).setClaims(claims).setIssuedAt(now)
				.setExpiration(expiryDate).signWith(SignatureAlgorithm.HS512, SECRET).compact();

	}

	public boolean validateToken(String token) {
		try {
			Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
			return true;
		} catch (ExpiredJwtException e) {
			System.out.println("Error: Token is expired");
		} catch (UnsupportedJwtException e) {
			System.out.println("Error: Token is unsupported");
		} catch (MalformedJwtException e) {
			System.out.println("Error: Token is invalid");
		} catch (SignatureException e) {
			System.out.println("Error: Token signature is invalid");
		} catch (IllegalArgumentException e) {
			System.out.println("Error: JWT Claims string is empty");
		}
		return false;
	}

	public String getUsernameFromToken(String token) {
		return Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody().getSubject();
	}

}
