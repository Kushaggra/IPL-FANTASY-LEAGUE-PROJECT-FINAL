package com.manipal.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

 

@Entity
public class MatchStats {
     @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    int id;
      
    int matchId;
    
    String teamName;
    int totalOvers=20;
    int runs=0;
    int wickets=0;
    int catches=0;
    int lbw=0;
    float runRate=0;

 

    
    public MatchStats(int id, int matchId, String teamName, int runs, int wickets, int catches,
            int lbw) {
        super();
        this.id = id;
        this.matchId = matchId;
        this.teamName = teamName;
    
        this.runs = runs;
        this.wickets = wickets;
        this.catches = catches;
        this.lbw = lbw;
        setRunRate();
    }

 

    
    public MatchStats() {
        
    }

 


    public int getId() {
        return id;
    }

 


    public void setId(int id) {
        this.id = id;
    }

 


    public int getMatchId() {
        return matchId;
    }

 


    public void setMatchId(int matchId) {
        this.matchId = matchId;
    }

 


    public String getTeamName() {
        return teamName;
    }

 


    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

 


    public int getTotalOvers() {
        return totalOvers;
    }

 


    public void setTotalOvers(int totalOvers) {
        this.totalOvers = totalOvers;
    }

 


    public int getRuns() {
        return runs;
    }

 


    public void setRuns(int runs) {
        this.runs = runs;
    }

 


    public int getWickets() {
        return wickets;
    }

 


    public void setWickets(int wickets) {
        this.wickets = wickets;
    }

 


    public int getCatches() {
        return catches;
    }

 


    public void setCatches(int catches) {
        this.catches = catches;
    }

 


    public int getLbw() {
        return lbw;
    }

 


    public void setLbw(int lbw) {
        this.lbw = lbw;
    }

 


    public float getRunRate() {
        return runRate;
    }

 


    public void setRunRate() {
        this.runRate =runs/totalOvers;
    }

 


    @Override
    public String toString() {
        return "MatchStats [matchId=" + matchId + ", teamName=" + teamName + ", totalOvers=" + totalOvers + ", runs="
                + runs + ", wickets=" + wickets + ", catches=" + catches + ", lbw=" + lbw + ", runRate=" + runRate
                + "]";
    }

 

 


    
    
}