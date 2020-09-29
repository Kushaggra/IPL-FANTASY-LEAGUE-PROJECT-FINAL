package com.telstra.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name= "admin")
public class Admin {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="admin_Id")
	private int adminId;
	
	@Column(name="user_name")
	private String userName;
	
	@Column(name="password")
	private String password;
	
	public Admin() {}
	
public int getAdminId() {
		return adminId;
	}

	public void setAdminId(int adminId) {
		this.adminId = adminId;
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

@Override
	public String toString() {
		return "Admin [adminId=" + adminId + ", userName=" + userName + ", password=" + password + "]";
	}

public Admin(int adminId, String userName, String password) {
		super();
		this.adminId = adminId;
		this.userName = userName;
		this.password = password;
	}

//----------Userdefined Funcitons-------------
	
	
	public void manageTournament() {
		
	}
	
	public void scheduleMatches() {		
	
	}
	
	public void rescheduleMatches() {
		
	}
	public void cancelMatch() {
		
	}
	public void viewBidders() {
		
	}
	public void manageTeams() {
//		Add Team
//		Delete Team
//		Update Team
		
		Team t1 = new Team();
		
		
		
	}
	public void updateTeamStatistics() {
		
	}
	public void commenceTournament() {
		
	}
	

}
