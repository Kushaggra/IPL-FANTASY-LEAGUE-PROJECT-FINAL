package com.manipal.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Result {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
    private String firstTeam;
    private String secondTeam;
    private String thirdTeam;
    
    public Result() {}
    

	public Result(int id, String firstTeam, String secondTeam, String thirdTeam) {
		super();
		this.id = id;
		this.firstTeam = firstTeam;
		this.secondTeam = secondTeam;
		this.thirdTeam = thirdTeam;
	}


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstTeam() {
		return firstTeam;
	}

	public void setFirstTeam(String firstTeam) {
		this.firstTeam = firstTeam;
	}

	public String getSecondTeam() {
		return secondTeam;
	}

	public void setSecondTeam(String secondTeam) {
		this.secondTeam = secondTeam;
	}

	public String getThirdTeam() {
		return thirdTeam;
	}

	public void setThirdTeam(String thirdTeam) {
		this.thirdTeam = thirdTeam;
	}


	@Override
	public String toString() {
		return "Result [id=" + id + ", firstTeam=" + firstTeam + ", secondTeam=" + secondTeam + ", thirdTeam="
				+ thirdTeam + "]";
	}
    
   
    
    
}
