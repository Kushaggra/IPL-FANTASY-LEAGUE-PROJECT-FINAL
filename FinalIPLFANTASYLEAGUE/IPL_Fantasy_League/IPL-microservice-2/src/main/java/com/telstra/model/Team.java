package com.telstra.model;

import java.util.List;

import javax.persistence.*;

@Entity
@Table(name="teams")
public class Team {

	//private static int count; 
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="team_Id")
	private int teamId;
	
	@Column(name="team_name")
	private String teamName;
	
	@Column(name="points")
	private int points;
	
	@Column(name="ranking")
	private int ranking;
	
	@Column(name="statistics")
	private String statistics;
	
	@Column(name="team_player")
	private String teamPlayer;
	
	@Column(name="status")
	private int status;

	public Team() {}

	public Team(int teamId, String teamName, int points, int ranking, String statistics, String teamPlayer,
			int status) {
		super();
		this.teamId = teamId;
		this.teamName = teamName;
		this.points = points;
		this.ranking = ranking;
		this.statistics = statistics;
		this.teamPlayer = teamPlayer;
		this.status = status;
	}

	@Override
	public String toString() {
		return "Team [teamId=" + teamId + ", teamName=" + teamName + ", points=" + points + ", ranking=" + ranking
				+ ", statistics=" + statistics + ", teamPlayer=" + teamPlayer + ", status=" + status + "]";
	}

	public int getTeamId() {
		return teamId;
	}

	public void setTeamId(int teamId) {
		this.teamId = teamId;
	}

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}

	public int getPoints() {
		return points;
	}

	public void setPoints(int points) {
		this.points = points;
	}

	public int getRanking() {
		return ranking;
	}

	public void setRanking(int ranking) {
		this.ranking = ranking;
	}

	public String getStatistics() {
		return statistics;
	}

	public void setStatistics(String statistics) {
		this.statistics = statistics;
	}

	public String getTeamPlayer() {
		return teamPlayer;
	}

	public void setTeamPlayer(String teamPlayer) {
		this.teamPlayer = teamPlayer;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}
	
}




//{
//	"teamName":"Kochi Tuskers",
//	"points":0,
//	"ranking":0,
//	"statistics":"NA",
//    "teamPlayer":"Hardik Pandya",
//	"status":0
//}