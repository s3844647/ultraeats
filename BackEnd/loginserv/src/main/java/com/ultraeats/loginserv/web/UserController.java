package com.ultraeats.loginserv.web;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ultraeats.loginserv.model.User;
import com.ultraeats.loginserv.payload.JwtResponse;
import com.ultraeats.loginserv.payload.LoginRequest;
import com.ultraeats.loginserv.repo.UserRepository;
import com.ultraeats.loginserv.security.JwtUtils;

@RestController
@RequestMapping("/api/users")
public class UserController {

	// Written based on:
	// https://www.bezkoder.com/spring-boot-postgresql-example/
	// BezKoder - Accessed 7 April 2022.
	// Implements authentication.

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@GetMapping
	public ResponseEntity<Collection<User>> getAllUsers() {
		try {
			Collection<User> users = userRepository.findAll();
			if (users.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			} else {
				return new ResponseEntity<>(users, HttpStatus.OK);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("{username}")
	public ResponseEntity<User> getUserByName(@PathVariable String username) {
		User user = null;
		try {
			user = userRepository.findByUsername(username);
			return new ResponseEntity<User>(user, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<User>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/register")
	public ResponseEntity<User> registerUser(@RequestBody User user) {
		try {
			user.setPassword(bCryptPasswordEncoder.encode(user.getPassword())); // bad credentials fix...?
			user.setUsername(user.getUsername());
			User newUser = userRepository.save(user);
			return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<User>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest user) {
		String authException = "";
		try {
			Authentication authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
			SecurityContextHolder.getContext().setAuthentication(authentication);
			String jwt = jwtUtils.generateToken(authentication);
			return ResponseEntity.ok(new JwtResponse(jwt, true));
		} catch (Exception e) {
			authException = "Error: Something went wrong with authentication.";
			e.printStackTrace(); // remember to remove this
		}
		return new ResponseEntity<String>(authException, HttpStatus.BAD_REQUEST);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
		try {
			user.setUserId(id);
			userRepository.save(user);
			return new ResponseEntity<User>(user, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/delete/{username}")
	public ResponseEntity<HttpStatus> deleteUser(@PathVariable String username) {
		try {
			User user = userRepository.findByUsername(username);
			userRepository.delete(user);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
