package com.ultraeats.loginserv.config;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.rds.AmazonRDS;
import com.amazonaws.services.rds.AmazonRDSClientBuilder;
import com.amazonaws.services.rds.model.CreateDBInstanceRequest;
import com.amazonaws.services.rds.model.DBInstance;
import com.amazonaws.services.rds.model.Endpoint;

public class RDSConfig {

	// This is a programmatic request to create an RDS database. It must be run only
	// once before the application itself is run.
	// Based on:
	// https://github.com/eugenp/tutorials/blob/master/aws/src/main/java/com/baeldung/rds/AWSRDSService.java
	// GitHub (Baeldung) - Accessed 9 April 2022.

	public AmazonRDS rds() {

		return AmazonRDSClientBuilder.standard().withRegion(Regions.US_EAST_1).build();
	}

	public String createInstance() {

		String identifier = "";
		CreateDBInstanceRequest request = new CreateDBInstanceRequest();
		request.setDBInstanceIdentifier("myuserdb");
		request.setDBInstanceClass("db.t4g.medium");
		request.setEngine("postgres");
		request.setMultiAZ(false);
		request.setMasterUsername("postgres");
		request.setMasterUserPassword("postgres1234");
		request.setDBName("userdb");
		request.setMonitoringInterval(0); // is this default?
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

	public static void main(String[] args) {
		RDSConfig rdsConfig = new RDSConfig();
		String inst = rdsConfig.createInstance();
		System.out.println(inst);
	}
}