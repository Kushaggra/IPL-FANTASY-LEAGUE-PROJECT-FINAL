package com.telstra.exceptionpack;


public class AdminNotFoundException extends RuntimeException{

	public AdminNotFoundException(String message) {
		super(message);
	}
}
