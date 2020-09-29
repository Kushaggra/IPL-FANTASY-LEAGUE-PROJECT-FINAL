package com.manipal.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manipal.model.Bid;
import com.manipal.model.LeaderBoard;
import com.manipal.model.Match;
import com.manipal.model.MatchStats;
import com.manipal.model.Result;
import com.manipal.model.Team;
import com.manipal.repository.BidRepository;
import com.manipal.repository.BidderRepository;
import com.manipal.repository.LeaderBoardRepository;
import com.manipal.repository.MatchRepository;
import com.manipal.repository.MatchStatsRepository;
import com.manipal.repository.ResultRepository;
import com.manipal.repository.TeamRepository;

@Service
public class SystemService implements ISystemService {

	@Autowired
	BidderRepository bidderRepository;

	@Autowired
	MatchRepository matchRepository;

	@Autowired
	TeamRepository teamRepository;

	@Autowired
	LeaderBoardRepository leaderBoardRepository;

	@Autowired
	BidRepository bidRepository;
	
	@Autowired
	ResultRepository resultRepository;
	
	@Autowired
    MatchStatsRepository stats;

//	public void UpdateTeamStandings(Match match) {
//
//		Team team1 = teamRepository.findTeamByTeamName(match.getTeamOne());
//		Team team2 = teamRepository.findTeamByTeamName(match.getTeamTwo());
//		
//
//
//		if (team1.getTeamName().equals(match.getWinner())) {
//			
//			team1.setPoints(team1.getPoints() + 2);
//			
//		//	team1.setRanking(team1.getRanking() + 1);
//			
//			teamRepository.save(team1);
//		} else {
//			
//			team2.setPoints(team2.getPoints() + 2);
//			
//		//	team1.setRanking(team1.getRanking() + 1);
//			
//			teamRepository.save(team2);
//		}
//		List<Team> team=teamRepository.findByOrderByPointsDesc();
//		for(int i=0;i<team.size();i++) {
//			Team t=team.get(i);
//			t.setRanking(i+1);
//			teamRepository.save(t);
//		}
//	}

	
	public void UpdateTeamStandings(Match match) {

		 

        Team team1 = teamRepository.findTeamByTeamName(match.getTeamOne());
        Team team2 = teamRepository.findTeamByTeamName(match.getTeamTwo());
        

        if (team1.getTeamName().equals(match.getWinner())) {
            
            team1.setPoints(team1.getPoints() + 2);
            
        //    team1.setRanking(team1.getRanking() + 1);
            
            teamRepository.save(team1);
        } else {
            
            team2.setPoints(team2.getPoints() + 2);
            
        //    team1.setRanking(team1.getRanking() + 1);
            
            teamRepository.save(team2);
        }
        List<Team> team=teamRepository.findByOrderByPointsDesc();
        for(int i=0;i<team.size();i++) {
            Team t=team.get(i);
            t.setRanking(i+1);
            teamRepository.save(t);    }
        //--------------------------------------------------------
       
        List<MatchStats> runRate=stats.findByOrderByRunRateAsc();
        List<Team> teamByRank=teamRepository.findByOrderByRankingAsc();
        for(int i=1;i<teamByRank.size();i++) {
            
        	Team t=teamByRank.get(i);
            Team pt=teamByRank.get(i-1);
           
            
            if(t.getRanking()==pt.getRanking()) {
                List<MatchStats> statsTeam1=stats.findByTeamName(t.getTeamName());
                int count1=0;
                
                for(int j=0;j<statsTeam1.size();j++) {
                    count1+=statsTeam1.get(j).getRunRate();    }
                count1=count1/statsTeam1.size();
                
                List<MatchStats> statsTeam2=stats.findByTeamName(pt.getTeamName());
                int count2=0;
                for(int j=0;j<statsTeam2.size();j++) {
                    count2+=statsTeam2.get(j).getRunRate();
                }
                count2=count2/statsTeam2.size();
                if(count1>count2) {
                    t.setRanking(t.getRanking()+1);
                    
                }else {
                    pt.setRanking(pt.getRanking()+1);
                }
            }
            teamRepository.save(t);
            teamRepository.save(pt);
        }
        //-------------------------------------------------------------------------------------
        
    }
	
	public List<LeaderBoard> Leaderboard() {

		List<LeaderBoard> bidder = leaderBoardRepository.findAllByOrderByBidderRankingDesc();
		List<LeaderBoard> leader = new ArrayList();
		leader.add(bidder.get(0));
		leader.add(bidder.get(1));
		leader.add(bidder.get(2));

		return leader;

	}
	
	
	public List<LeaderBoard> HomeLeaderboard() {

		return leaderBoardRepository.findAllByOrderByBidderRankingAsc();

	}
	
	
	public void UpdateBidderPoints(Match match) {

		List<Bid> bid = bidRepository.findByMatchId(match.getMatchId());
		Team a = teamRepository.findTeamByTeamName(match.getTeamOne());

		Team b = teamRepository.findTeamByTeamName(match.getTeamTwo());

		int dif = Math.abs(a.getPoints() - b.getPoints());
		for (int i = 0; i < bid.size(); i++) {
			Bid B = bid.get(i);

			String bt = bid.get(i).getTeamBidded();
			String w = match.getWinner();
			
		
			if (bt.equals(w)) {
				LeaderBoard l = leaderBoardRepository.findById(B.getBidderId()).orElse(null);

			
				l.setBidsWon(l.getBidsWon() + 1);
				/// l.setPercentile(percentile);

				if (a.getPoints() > b.getPoints()) {

					if (a.getTeamName().equals(w)) {
						int id = B.getBidderId();

						l.setPoint(l.getPoint() + 2);

					} else {

						if (dif <= 6 && dif > 0) {
							l.setPoint(l.getPoint() + 3);
						} else if (dif > 6) {
							l.setPoint(l.getPoint() + 5);
						}
					}
				} else {
					if (a.getTeamName().equals(w)) {

						if (dif <= 6 && dif > 0) {
							l.setPoint(l.getPoint() + 3);
						} else if (dif > 6) {
							l.setPoint(l.getPoint() + 5);
						}
					} else {
						l.setPoint(l.getPoint() + 2);
					}
				}
				l.setBidsParticipated(l.getBidsWon()+l.getBidsLost());
				l.setPercentile((l.getBidsWon()*100)/l.getBidsParticipated());
				leaderBoardRepository.save(l);
			} else {

				int bId = bid.get(i).getBidderId();
				LeaderBoard l = leaderBoardRepository.findById(bId).orElse(null);
				l.setBidsLost(l.getBidsLost() + 1);
				/// l.setPercentile(percentile); do the maths
				l.setBidsParticipated(l.getBidsWon()+l.getBidsLost());
				l.setPercentile((l.getBidsWon()*100)/l.getBidsParticipated());
				leaderBoardRepository.save(l);
			}
		}

		List<LeaderBoard> leaderBoard = leaderBoardRepository.findAllByOrderByPointDesc();
		for (int i = 0; i < leaderBoard.size(); i++) {
			LeaderBoard l = leaderBoard.get(i);
			l.setBidder_ranking(i + 1);
			
			leaderBoardRepository.save(l);
		}

		UpdateTeamStandings(match);

	}

//	public void updateMatchStat() {
//
//		// Match statistic should include the date and match result of all
//		// the earlier matches System should display the match statistics.
//		// Admin should be able to update the match results and the same
//		// reflected in the statistics dashboard.
//		// return list of teams with their points // team id-points
//
//	}

//	public Result declareResults() {
//     
//		Result result =new Result();
//		List<Team> team=teamRepository.findByOrderByPointsDesc();
//		
//			result.setFirstTeam(team.get(0).getTeamName());
//			result.setSecondTeam(team.get(1).getTeamName());
//			result.setThirdTeam(team.get(2).getTeamName());
//		resultRepository.save(result);
//		return result;
//
//	}

	public List<LeaderBoard> sendUpdatesToUser(Match match) {

		List<Bid> bid = bidRepository.findByMatchId(match.getMatchId());
		List<LeaderBoard> leaderBoard = new ArrayList();
		for (int i = 0; i < bid.size(); i++) {
			int id = bid.get(i).getBidderId();
			LeaderBoard l = leaderBoardRepository.findById(id).orElse(null);
			leaderBoard.add(l);
		}
		return leaderBoard;
	}

	public void flushPointsTable() {

		List<Team> team=teamRepository.findAll();
		for(int i=0;i<team.size();i++) {
			Team t=team.get(i);
			t.setPoints(0);
			t.setRanking(0);
			teamRepository.save(t);
		}
	}
	
	public void updateMatchStat(MatchStats matchStats) {
        stats.save(matchStats);
    }       
    
	public List<MatchStats> getAllMatchStat() {
        return stats.findAll();
    } 
	
    public List<MatchStats> show(int mi){
       
        List<MatchStats> statistic=stats.findByMatchId(mi);
        return statistic;        
    }
    
    public List<Team> getTeams(){
        return teamRepository.findAll();
    }
    public List<Match> getMatches(){
        return matchRepository.findAll();
    }
    public Result getResult() {
        return resultRepository.findAll().get(0);
    }

	public Match getMatchbyId(int matchId) {
        return matchRepository.findById(matchId).orElse(null);

	}

}
