package com.telstra.model;

import java.sql.Date;
import java.sql.Time;

public class BidMatch {
	private int bidId;
	private int bidderId;
	private int matchId;
	private String teamBidded;
    private String teamOne;
	private String teamTwo;
    private Date date;
    private Time time;
    private String stadium;
    private String winner;
    
    public BidMatch() {};
    
	public BidMatch(int bidId, int bidderId, int matchId, String teamBidded, String teamOne, String teamTwo, Date date,
			Time time, String stadium, String winner) {
		super();
		this.bidId = bidId;
		this.bidderId = bidderId;
		this.matchId = matchId;
		this.teamBidded = teamBidded;
		this.teamOne = teamOne;
		this.teamTwo = teamTwo;
		this.date = date;
		this.time = time;
		this.stadium = stadium;
		this.winner = winner;
	}
	
	public int getBidId() {
		return bidId;
	}
	public void setBidId(int bidId) {
		this.bidId = bidId;
	}
	public int getBidderId() {
		return bidderId;
	}
	public void setBidderId(int bidderId) {
		this.bidderId = bidderId;
	}
	public int getMatchId() {
		return matchId;
	}
	public void setMatchId(int matchId) {
		this.matchId = matchId;
	}
	public String getTeamBidded() {
		return teamBidded;
	}
	public void setTeamBidded(String teamBidded) {
		this.teamBidded = teamBidded;
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
	public Time getTime() {
		return time;
	}
	public void setTime(Time time) {
		this.time = time;
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
    
    
    
}
