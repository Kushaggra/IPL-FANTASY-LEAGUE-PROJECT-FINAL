package com.manipal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.manipal.model.Bidder;
import com.manipal.model.LeaderBoard;
import com.manipal.model.Match;
import com.manipal.model.MatchStats;
import com.manipal.model.Result;
import com.manipal.model.Team;
import com.manipal.proxy.SystemProxy;
import com.manipal.service.SystemService;

@RestController
public class SystemController {
    
    @Autowired
    SystemProxy systemProxy;
    
    
    @Autowired
    SystemService systemService;

     @PostMapping("updateTeamStanding")
    public String UpdateTeamStanding(@RequestBody Match match) {

         systemService.UpdateTeamStandings(match);
        return "Match between "+match.getTeamOne()+" and "+match.getTeamTwo()+" is conducted and Teams rankings have been Updated.";
 
     }//-------------------------------------------------------------------------------------------

 

    @GetMapping("/leaderboard")
    public List<LeaderBoard> Leaderboard() {
        return systemService.Leaderboard();

    }
    
    @GetMapping("/homeleaderboard")
    public List<LeaderBoard> HomeLeaderboard() {
        return systemService.HomeLeaderboard();

    }
    
    
//--------------------------------------------------------------------
    @PostMapping("updatebidderpoints")
   public String UpdateBidderPoints(@RequestBody Match match) {
      systemService.UpdateBidderPoints(match);
        return "Match Conducted , Bidder Points updated";

    }

//    -----------------------------------------------------------------------------------------------
    
    @PostMapping("/updatematchstat")
    public void updateMatchStat(@RequestBody MatchStats matchStats) {
        systemService.updateMatchStat(matchStats);

    }

    @RequestMapping("showStats/{matchId}")
    public List<MatchStats> show(@PathVariable  int matchId){
        List<MatchStats> ms=systemService.show(matchId);
        return ms;
                
    }
 //    ---------------------------------------------------------------------------------------------------------
//    
//    
//    
//    @RequestMapping("/sendupdatestouser")
//    public void sendUpdatesToUser() {
//        
//    
//    }
//
// 

    @RequestMapping("/flushpointstable")
    public void flushPointsTable() {
    		systemService.flushPointsTable();
     }
    
    @GetMapping("{username}/{password}/bidder")    
    public List<Bidder> getBidder(@PathVariable String username,@PathVariable String password){
        
        List<Bidder> bidder=systemProxy.getBidder(username, password);
        return bidder;
        
    }
    

    @GetMapping("{username}/{password}/result")    
    public Result showResult(@PathVariable String username,@PathVariable String password){
        
        Result tournamentResult=systemProxy.declareResults(username, password);
        return tournamentResult;
        
    }
    @GetMapping("flush")
    public String resetTeamPoint() {
        systemService.flushPointsTable();
        return "flush Succesfully";
    }

    @GetMapping("getTeams")
    public List<Team> getTeam(){
        return systemService.getTeams();}
   
    @GetMapping("getMatches")
    public List<Match> getMatches(){
        return systemService.getMatches();
    }
    @GetMapping("getResult")
    public Result getResult(){
        return systemService.getResult();
    }
	@GetMapping("match/{matchId}")
	public Match getMatchById( @PathVariable int matchId) {
		return systemService.getMatchbyId(matchId);
	}
}