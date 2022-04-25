package com.ultraeats.loginserv.config;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CreateBucketRequest;
import com.amazonaws.services.s3.model.GetBucketLocationRequest;

public class S3Config {

	// This is a programmatic request to create an S3 bucket. It must be run only
	// once before the application itself is run.
	// Based on tutorial notes.

	public AmazonS3 s3() {

		return AmazonS3ClientBuilder.standard().withRegion(Regions.US_EAST_1).build();
	}

	public String createBucket() {

		CreateBucketRequest request = new CreateBucketRequest("ultraeats-s3-frontend");
		s3().createBucket(request);

		GetBucketLocationRequest getRequest = new GetBucketLocationRequest("ultraeats-s3-frontend");
		String location = s3().getBucketLocation(getRequest);

		return location;
	}

	public static void main(String[] args) {
		S3Config s3config = new S3Config();
		String location = s3config.createBucket();
		System.out.println(location);
	}
}
