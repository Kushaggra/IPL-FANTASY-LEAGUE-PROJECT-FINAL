package com.manipal.model;

import java.sql.Date;
import java.sql.Time;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="matches")
public class Match {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="match_id")
    private int matchId;
	@Column(name="team_one")
    private String teamOne;
	
	@Column(name="team_two")
    private String teamTwo;
    private Date date;
    private String stadium;
    private String winner;
    
    private Time time;
    public Match() {}
    
    public Match(int matchId, String teamOne, String teamTwo, Date date, String stadium, String winner, Time time) {
        super();
        this.matchId = matchId;
        this.teamOne = teamOne;
        this.teamTwo = teamTwo;
        this.date = date;
        this.stadium = stadium;
        this.winner = winner;
        this.time = time;
    }
    public int getMatchId() {
        return matchId;
    }
    public void setMatchId(int matchId) {
        this.matchId = matchId;
    }
    public String getTeamOne() {
        return teamOne;
    }
    public void setTeamOne(String teamOne) {
        this.teamOne = teamOne;
    }
    public String getTeamTwo() {
        return teamTwo;
    }
    public void setTeamTwo(String teamTwo) {
        this.teamTwo = teamTwo;
    }
    public Date getDate() {
        return date;
    }
    public void setDate(Date date) {
        this.date = date;
    }
    public String getStadium() {
        return stadium;
    }
    public void setStadium(String stadium) {
        this.stadium = stadium;
    }
    public String getWinner() {
        return winner;
    }
    public void setWinner(String winner) {
        this.winner = winner;
    }




	@Override
	public String toString() {
		return "Match [matchId=" + matchId + ", teamOne=" + teamOne + ", teamTwo=" + teamTwo + ", date=" + date
				+ ", stadium=" + stadium + ", winner=" + winner + ", time=" + time + "]";
	}

	public Time getTime() {
		return time;
	}

	public void setTime(Time time) {
		this.time = time;
	}
    
}
