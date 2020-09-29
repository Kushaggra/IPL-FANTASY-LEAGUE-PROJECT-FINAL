package com.telstra.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="verification_codes")
public class VerificationCode {
	@Id
	@Column(name = "bidder_id")
	private int bidderId;
	private int code;
	
	public VerificationCode() {}
	
	public VerificationCode(int bidderId, int code) {
		super();
		this.bidderId = bidderId;
		this.code = code;
	}
	
	public int getBidderId() {
		return bidderId;
	}
	public void setBidderId(int bidderId) {
		this.bidderId = bidderId;
	}
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	
	
	
}
