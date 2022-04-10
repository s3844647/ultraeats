package com.ultraeats.loginserv.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.rds.AmazonRDS;
import com.amazonaws.services.rds.AmazonRDSClientBuilder;
import com.amazonaws.services.rds.model.CreateDBInstanceRequest;
import com.amazonaws.services.rds.model.DBInstance;
import com.amazonaws.services.rds.model.Endpoint;

@Configuration
public class AmazonConfig {

	// Based on:
	// https://github.com/eugenp/tutorials/blob/master/aws/src/main/java/com/baeldung/rds/AWSRDSService.java
	// GitHub (Baeldung) - Accessed 9 April 2022.

	@Bean
	public AmazonRDS rds() { // RDS client constructor. (Need to specify credentials...?)

		return AmazonRDSClientBuilder.standard().withRegion(Regions.US_EAST_1).build();
	}

	public String createInstance() {

		String identifier = "";
		CreateDBInstanceRequest request = new CreateDBInstanceRequest();
		request.setDBInstanceIdentifier("example"); // checking uniqueness
		request.setEngine("postgres");
		request.setMultiAZ(false);
		request.setMasterUsername("postgres");
		request.setMasterUserPassword("postgres1234");
		request.setDBName("userdb");
		request.setAllocatedStorage(20);
		
		DBInstance inst = rds().createDBInstance(request);
		
		identifier = inst.getDBInstanceIdentifier();
		String status = inst.getDBInstanceStatus();
		Endpoint endpoint = inst.getEndpoint();
		String endpointUrl = "Endpoint URL not available yet.";
		if (endpoint != null) {
			endpointUrl = endpoint.toString();
		}
		
		System.out.println(status);
		System.out.println(endpointUrl);
		return identifier;
	}
}
