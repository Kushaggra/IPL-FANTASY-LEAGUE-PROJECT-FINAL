package com.telstra.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class BidderResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
	@ExceptionHandler(value = {NotFoundException.class})
	public ResponseEntity<ExceptionResponse> notFound(NotFoundException exception){
		ExceptionResponse response = new ExceptionResponse(404,exception.getMessage(), LocalDateTime.now());
		return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(value = {UnauthorizedException.class})
	public ResponseEntity<ExceptionResponse> unauthorized(UnauthorizedException exception){
		ExceptionResponse response = new ExceptionResponse(401,exception.getMessage(),LocalDateTime.now());
		return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
	}

	@ExceptionHandler(value = {ConflictException.class})
	public ResponseEntity<ExceptionResponse> conflict(ConflictException exception){
		ExceptionResponse response = new ExceptionResponse(409	,exception.getMessage(),LocalDateTime.now());
		return new ResponseEntity<>(response, HttpStatus.CONFLICT);
	}
	
	@ExceptionHandler(value = {GoneException.class})
	public ResponseEntity<ExceptionResponse> gone(GoneException exception){
		ExceptionResponse response = new ExceptionResponse(410	,exception.getMessage(),LocalDateTime.now());
		return new ResponseEntity<>(response, HttpStatus.GONE);
	}
	
}
