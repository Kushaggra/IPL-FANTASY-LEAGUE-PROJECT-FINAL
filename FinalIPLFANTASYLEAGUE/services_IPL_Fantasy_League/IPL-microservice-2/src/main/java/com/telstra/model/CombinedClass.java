package com.telstra.model;

import java.sql.Date;
import java.sql.Time;

public class CombinedClass {
	
    private int matchId;
    private String teamOne;
    private String teamTwo;
    private Date date;
    private String stadium;
    private String winner;
    private Time time;
    
    
    private String teamName1;
    private int totalOvers1;
    private int runs1=0;
    private int wickets1=0;
    private int catches1=0;
    private int lbw1=0;
    private float runRate1=0;
    
    
    private String teamName2;
    private int totalOvers2;
    private int runs2=0;
    private int wickets2=0;
    private int catches2=0;
    private int lbw2=0;
    private float runRate2=0;
    
	public CombinedClass() { }

	public CombinedClass(int matchId, String teamOne, String teamTwo, Date date, String stadium, String winner,
			Time time, String teamName1, int totalOvers1, int runs1, int wickets1, int catches1, int lbw1,
			float runRate1, String teamName2, int totalOvers2, int runs2, int wickets2, int catches2, int lbw2,
			float runRate2) {
		super();
		this.matchId = matchId;
		this.teamOne = teamOne;
		this.teamTwo = teamTwo;
		this.date = date;
		this.stadium = stadium;
		this.winner = winner;
		this.time = time;
		this.teamName1 = teamName1;
		this.totalOvers1 = totalOvers1;
		this.runs1 = runs1;
		this.wickets1 = wickets1;
		this.catches1 = catches1;
		this.lbw1 = lbw1;
		this.runRate1 = runRate1;
		this.teamName2 = teamName2;
		this.totalOvers2 = totalOvers2;
		this.runs2 = runs2;
		this.wickets2 = wickets2;
		this.catches2 = catches2;
		this.lbw2 = lbw2;
		this.runRate2 = runRate2;
	}

	@Override
	public String toString() {
		return "CombinedClass [matchId=" + matchId + ", teamOne=" + teamOne + ", teamTwo=" + teamTwo + ", date=" + date
				+ ", stadium=" + stadium + ", winner=" + winner + ", time=" + time + ", teamName1=" + teamName1
				+ ", totalOvers1=" + totalOvers1 + ", runs1=" + runs1 + ", wickets1=" + wickets1 + ", catches1="
				+ catches1 + ", lbw1=" + lbw1 + ", runRate1=" + runRate1 + ", teamName2=" + teamName2 + ", totalOvers2="
				+ totalOvers2 + ", runs2=" + runs2 + ", wickets2=" + wickets2 + ", catches2=" + catches2 + ", lbw2="
				+ lbw2 + ", runRate2=" + runRate2 + "]";
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

	public Time getTime() {
		return time;
	}

	public void setTime(Time time) {
		this.time = time;
	}

	public String getTeamName1() {
		return teamName1;
	}

	public void setTeamName1(String teamName1) {
		this.teamName1 = teamName1;
	}

	public int getTotalOvers1() {
		return totalOvers1;
	}

	public void setTotalOvers1(int totalOvers1) {
		this.totalOvers1 = totalOvers1;
	}

	public int getRuns1() {
		return runs1;
	}

	public void setRuns1(int runs1) {
		this.runs1 = runs1;
	}

	public int getWickets1() {
		return wickets1;
	}

	public void setWickets1(int wickets1) {
		this.wickets1 = wickets1;
	}

	public int getCatches1() {
		return catches1;
	}

	public void setCatches1(int catches1) {
		this.catches1 = catches1;
	}

	public int getLbw1() {
		return lbw1;
	}

	public void setLbw1(int lbw1) {
		this.lbw1 = lbw1;
	}

	public float getRunRate1() {
		return runRate1;
	}

	public void setRunRate1(float runRate1) {
		this.runRate1 = runRate1;
	}

	public String getTeamName2() {
		return teamName2;
	}

	public void setTeamName2(String teamName2) {
		this.teamName2 = teamName2;
	}

	public int getTotalOvers2() {
		return totalOvers2;
	}

	public void setTotalOvers2(int totalOvers2) {
		this.totalOvers2 = totalOvers2;
	}

	public int getRuns2() {
		return runs2;
	}

	public void setRuns2(int runs2) {
		this.runs2 = runs2;
	}

	public int getWickets2() {
		return wickets2;
	}

	public void setWickets2(int wickets2) {
		this.wickets2 = wickets2;
	}

	public int getCatches2() {
		return catches2;
	}

	public void setCatches2(int catches2) {
		this.catches2 = catches2;
	}

	public int getLbw2() {
		return lbw2;
	}

	public void setLbw2(int lbw2) {
		this.lbw2 = lbw2;
	}

	public float getRunRate2() {
		return runRate2;
	}

	public void setRunRate2(float runRate2) {
		this.runRate2 = runRate2;
	}

}

//	
//	
//	
//	{
//	"matchId": 1,
//	"teamOne":"Mumbai Indians",
//	"teamTwo":"Chennai Super Kings",
//	"date":"2019-09-16",
//	"stadium":"Sheikh Zayed Cricket Stadium, Abu Dhabi",
//	"winner":"Mumbai Indians",
//	"teamName1":"Mumbai Indians",
//	"totalOvers1":20,
//	"runs1":120,
//	"wickets1":5,
//	"catches1":3,
//	"lbw1":2,
//	"runRate1":154,
//	
//	
//	"teamName2":"Chennai Super Kings",
//	"totalOvers2":20,
//	"runs2":210,
//	"wickets2":3,
//	"catches2":2,
//	"lbw2":1,
//	"runRate2":143
//	}
