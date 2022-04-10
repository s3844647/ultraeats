package com.ultraeats.loginserv;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class launcher { // NOTE: Runs on port 2000.

	public static void main(String[] args) {
		SpringApplication.run(launcher.class, args);
	}

}
