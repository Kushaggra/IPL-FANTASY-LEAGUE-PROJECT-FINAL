package com.telstra.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name= "bidders")
public class Bidder {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="bidder_id")
	private int bidderId;
	@Column(name="user_name")
	private String userName;
	private String password;
	@Column(name="name")
	private String Name;
	private String email;
	@Column(name="phone_no")
	private String phoneNo;
	public Bidder() {
	}
	public Bidder(int bidderId, String userName, String password, String name, String email, String phoneNo) {
		super();
		this.bidderId = bidderId;
		this.userName = userName;
		this.password = password;
		Name = name;
		this.email = email;
		this.phoneNo = phoneNo;
	}
	@Override
	public String toString() {
		return "Bidder [bidderId=" + bidderId + ", userName=" + userName + ", password=" + password + ", Name=" + Name
				+ ", email=" + email + ", phoneNo=" + phoneNo + "]";
	}
	
	//----------Getter and Setter-----------------
	public int getBidderId() {
		return bidderId;
	}
	public void setBidderId(int bidderId) {
		this.bidderId = bidderId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhoneNo() {
		return phoneNo;
	}
	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	
//-----------User Def functions------------------------
	public void register() {
		
	}

	public void login() {   
			                       
    }                          
	
	public void showMatchDetails() {   
			                       
	}   
	
	public void selectTeam() {   
        
	}        
	public void changeTeam() {   
        
	}                     
	public void bid() {   
        
	}              
	
	public void cancelBid() {   
        
	}                    
	
	public void viewPointsTable() {   
        
	}                          
	public void viewLeaderboard() {   
        
	}                          
	
}
