package com.telstra.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.telstra.exceptionpack.AdminNotFoundException;
import com.telstra.jwt.JwtUtil;
import com.telstra.model.AuthenticationRequest;
import com.telstra.model.AuthenticationResponse;
import com.telstra.model.Bidder;
import com.telstra.model.CombinedClass;
import com.telstra.model.LeaderBoard;
import com.telstra.model.Match;
import com.telstra.model.MatchStats;
import com.telstra.model.Result;
import com.telstra.model.Team;
import com.telstra.model.Tournaments;
import com.telstra.proxy.ISystemProxy;
import com.telstra.service.AdminService;
import com.telstra.service.IBidderService;
import com.telstra.service.IMatchService;
import com.telstra.service.ITournamentService;
import com.telstra.service.LeaderBoardService;
import com.telstra.service.MyUserDetailsService;
import com.telstra.service.TeamService;

@RestController
@RequestMapping("admin")
@CrossOrigin("http://localhost:3000")
public class AdminController {
	
	@Autowired
	AdminService adminService;

	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private MyUserDetailsService userDetailsService;
	
	@Autowired
	private JwtUtil jwtTokenUtil;
	
	
	
	
	@PostMapping("authenticate")
	public ResponseEntity<?> createAuthToken(@RequestBody AuthenticationRequest authenticationRequest) {
		
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(authenticationRequest.getUserName(),authenticationRequest.getPassword()) 
					);
		}catch(BadCredentialsException e) {
			throw new AdminNotFoundException("Incoreect Credentials Entered!");
		}
		
		final UserDetails userDetails = userDetailsService
				.loadUserByUsername(authenticationRequest.getUserName());
	
		final String jwt = jwtTokenUtil.generateToken(userDetails);
		
		return ResponseEntity.ok(new AuthenticationResponse(jwt)); 
			
	}
	
	@GetMapping("verify")
	public boolean verifiJwtToken(HttpServletRequest request){
		
		final String authorizationHeader = request.getHeader("Authorization");
		int adminId = 0;
		String jwt = null;

		if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			jwt = authorizationHeader.substring(7);
			adminId = jwtTokenUtil.extractAdminId(jwt);
		}
		
		if(adminService.getAdminById(adminId)!=null) 
			return true;
		else
			return false;
	//return false;	
	}
	
	
// admin/{loginID}/{password}/.	
	
	//createTournament -----new tournament
	//updateTournament ----- update tournament
	
	//tournament/team/getTeam -----ALL RECORDS
	//tournament/team/new     ----add/Update
	//tournament/team/delete  ----- delete
	
	// PUT - @PutMapping - tournament/match/addOrUpdateMatch  -----add/update match
	// tournament/match/delete/{matchID}  					------- delete
	// GET - @GetMapping -  tournament/match/				--------ALL RECORDS
	// DELETE - @DeleteMapping -  tournament/match/			--------ALL RECORDS
	
//----------TO DO----------------------------------------------------------------
//	1. Class level mapping of ADmin credentials
//	2. addMatch()
//	
//	
//-------------------------------------------------------------------------------
	
	
	@Autowired
	private IBidderService bidderService;
	
	@Autowired
	private TeamService teamService;

	@Autowired
	private IMatchService matchService;
	
	@Autowired
	private ITournamentService tournamentService;
	
	@Autowired
	private LeaderBoardService leaderboardService;
	
	@Autowired 
	ISystemProxy systemProxy;
	
	private Logger logger = LoggerFactory.getLogger(AdminController.class);
	
	
//	@Autowired
	
//	@GetMapping
//	public Admin getAdmin(@PathVariable int adminId) {
//		
//		Admin admin = adminService.getAdminById(adminId);
//		
//		if(admin==null) {			
//			throw new AdminNotFoundException("Admin Access ID is Invalid.");
//		}
//		return admin;
//	}
	
//		@PostMapping("login")
//		public String generateAdminId(@RequestBody Admin admin) {
//			return "Admin ID for access = "+adminService.getAdminId(admin);
//			
//		}
//----------------------------Bidder --------------------------------------	
	@GetMapping("getBidders")
	public List<Bidder> getAllBidders() {
		
			return bidderService.getAllBidders();
	}

//---------------------------- Teams --------------------------------------			
	@PostMapping("teams/new")
	public String addorUpdateteam(@RequestBody Team obj) {
		String status=teamService.addTeam(obj);
		return status;
	}
	
	
	@GetMapping("teams/all")
	public List<Team> getAllTeamdetails() {
		return teamService.getAllTeamdetails();
	}
		
	@GetMapping("teams/count")
	public int TeamCount() {
		return teamService.getCount();
	}
	
	@PostMapping("teams/delete")
	public String deleteTeam(@RequestBody Map<String,String> map) {
		
		String Name = map.get("teamName");
		
		return teamService.deleteTeam(Name);
	}
	
		
//-------------------------------------- MATCH -----------------------------------------------		


	@GetMapping("match")
	public List<Match> getAllMatches() {
		List<Match> list =matchService.getAllMatches();
		//name+score of the winning team
		return list;
		
	}

	@GetMapping("match/{matchId}")
	public Match getMatchById( @PathVariable int matchId) {
		return matchService.getMatchbyId(matchId);
	}
	
	@PostMapping("addMatch")
	public String addMatch(@RequestBody Match match) {
		String message = matchService.addMatch(match);
		//name+score of the winning team
		return message;	
	}
	
	
	@PostMapping("scheduleMatch")
	public String scheduleMatch(@RequestBody Match match) {
		matchService.addOrUpdateMatch(match);
		return "Match Scheduled successfully";
		
	}
	
	
	@PutMapping("updateMatchResult")
	public String updateMatchResult(@RequestBody CombinedClass combinedObj) {
		
		
		Match match = new Match();
		MatchStats matchstats1 = new MatchStats();
		MatchStats matchstats2 = new MatchStats();
		
		match.setMatchId(combinedObj.getMatchId());
		match.setTeamOne(combinedObj.getTeamName1());
		match.setTeamTwo(combinedObj.getTeamName2());
		match.setDate(combinedObj.getDate());
		match.setStadium(combinedObj.getStadium());
		match.setTime(combinedObj.getTime());
		match.setWinner(combinedObj.getWinner());
		
		
		matchstats1.setMatchId(combinedObj.getMatchId());
		
		matchstats1.setCatches(combinedObj.getCatches1());
		matchstats1.setLbw(combinedObj.getLbw1());
		matchstats1.setRuns(combinedObj.getRuns1());
		matchstats1.setTeamName(combinedObj.getTeamName1());
		matchstats1.setTotalOvers(combinedObj.getTotalOvers1());
		matchstats1.setWickets(combinedObj.getWickets1());
		matchstats1.setRunRate();
		
		
		
		matchstats2.setMatchId(combinedObj.getMatchId());
		
		matchstats2.setMatchId(combinedObj.getMatchId());
		matchstats2.setCatches(combinedObj.getCatches2());
		matchstats2.setLbw(combinedObj.getLbw2());
		matchstats2.setRuns(combinedObj.getRuns2());
		matchstats2.setTeamName(combinedObj.getTeamName2());
		matchstats2.setTotalOvers(combinedObj.getTotalOvers2());
		matchstats2.setWickets(combinedObj.getWickets2());
		matchstats2.setRunRate();

		
		matchService.addOrUpdateMatch(match);
		systemProxy.updateMatchStat(matchstats1);
		systemProxy.updateMatchStat(matchstats2);
		logger.info("-----------------------------------------------");
		logger.info(teamService.setStats(matchstats1));
		logger.info(teamService.setStats(matchstats2));
		logger.info("-----------------------------------------------");
		systemProxy.UpdateTeamStanding(match);
		systemProxy.UpdateBidderPoints(match);
		//name+score of the winning team
		return "Match Result updated successfully";
	}

//---------------------------TOURNAMENT----------------------------------------------------
	
	@GetMapping("tournament")
	public Tournaments getTournament() {
		return tournamentService.getCurrentTournament();
	}
	
	@PostMapping("tournament")
	public String createTournament(@RequestBody Tournaments tournament) {
		systemProxy.resetTeamPoint();
		tournamentService.addTournament(tournament);
		
		return "Tournament created";
	}
	

	@PutMapping("tournament") //updated
	public String updateTournament(@RequestBody Tournaments tournament) {
		tournamentService.UpdateTournament(tournament);
		return "Tournament Updated";
	}
	
//---------------------------RESULTS----------------------------------------------------
	
		@GetMapping("declareresults")
		public Result declareResults() {
			Result result=	teamService.declareResults();
			return result;
		}
		
		@GetMapping("leaderboard")
		public List<LeaderBoard> getLeaderboard(){
			List<LeaderBoard> list = leaderboardService.getAll();
			return list;
		}
		
}
	

