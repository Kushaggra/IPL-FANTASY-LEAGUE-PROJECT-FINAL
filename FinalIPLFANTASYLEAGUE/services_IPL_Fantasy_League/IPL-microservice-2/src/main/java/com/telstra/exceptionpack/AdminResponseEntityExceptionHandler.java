package com.telstra.exceptionpack;


import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class AdminResponseEntityExceptionHandler extends ResponseEntityExceptionHandler{

	@ExceptionHandler(AdminNotFoundException.class)
	public ResponseEntity<ExceptionResponse> adminNotFound(AdminNotFoundException exception) {
		ExceptionResponse response= new ExceptionResponse(exception.getMessage(),LocalDateTime.now());
		return  new ResponseEntity<>(response, HttpStatus.NOT_FOUND );
		
		
	}
}
