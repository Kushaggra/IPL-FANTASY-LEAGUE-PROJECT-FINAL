package com.telstra.exception;

import java.time.LocalDateTime;

public class ExceptionResponse {
	private int errorCode;
	private String message;
	private LocalDateTime timestamp;
	
	public ExceptionResponse(){}
	public ExceptionResponse(int errorCode, String message, LocalDateTime timestamp) {
		super();
		this.errorCode = errorCode;
		this.message = message;
		this.timestamp = timestamp;
	}
	
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public LocalDateTime getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}
	public int getErrorCode() {
		return errorCode;
	}
	public void setErrorCode(int errorCode) {
		this.errorCode = errorCode;
	}
	
	
	
}
