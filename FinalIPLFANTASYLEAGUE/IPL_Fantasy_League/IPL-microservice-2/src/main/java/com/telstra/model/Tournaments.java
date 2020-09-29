package com.telstra.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity(name= "tournaments")
public class Tournaments {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="tournament_id")
    private int tournamentId;
	
	@Column(name="num_of_qulifiers")
    private int numOfQualifiers;
	
	@Column(name="num_of_teams")
    private int numOfTeams;

	@Column(name="num_of_matches_completed")
    private int numOfMatchesCompleted;
	
	@Column(name="status")
	private int status;
	
	public Tournaments() {}
	
    public Tournaments(int tournamentId, int numOfQualifiers, int numOfTeams, int numOfMatchesCompleted) {
		this.tournamentId = tournamentId;
		this.numOfQualifiers = numOfQualifiers;
		this.numOfTeams = numOfTeams;
		this.numOfMatchesCompleted = numOfMatchesCompleted;
		this.status = 1;
	}

	
	
    public int getTournamentId() {
		return tournamentId;
	}



	public void setTournamentId(int tournamentId) {
		this.tournamentId = tournamentId;
	}



	public int getNumOfQualifiers() {
		return numOfQualifiers;
	}



	public void setNumOfQualifiers(int numOfQualifiers) {
		this.numOfQualifiers = numOfQualifiers;
	}



	public int getNumOfTeams() {
		return numOfTeams;
	}



	public void setNumOfTeams(int numOfTeams) {
		this.numOfTeams = numOfTeams;
	}



	public int getNumOfMatchesCompleted() {
		return numOfMatchesCompleted;
	}



	public void setNumOfMatchesCompleted(int numOfMatchesCompleted) {
		this.numOfMatchesCompleted = numOfMatchesCompleted;
	}



	public int getStatus() {
		return status;
	}



	public void setStatus(int status) {
		this.status = status;
	}



@Override
	public String toString() {
		return "Tournaments [tournamentId=" + tournamentId + ", numOfQualifiers=" + numOfQualifiers + ", numOfTeams="
				+ numOfTeams + ", numOfMatchesCompleted=" + numOfMatchesCompleted + ", status=" + status + "]";
	}







//	@Column(name="match_id")
//    private int matchId;
//    
    
    
    

//	public int getMatchId() {
//		return matchId;
//	}
//
//	public void setMatchId(int matchId) {
//		this.matchId = matchId;
//	}
    
	
	/*{
		"tournamentId":12,
		"numOfQualifiers":5,
		"numOfTeams":8,
		"numOfMatchesCompleted":24, 
		"matchId":8
	}*/
}
 