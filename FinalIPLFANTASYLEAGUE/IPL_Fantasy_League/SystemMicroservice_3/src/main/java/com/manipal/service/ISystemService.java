package com.manipal.service;

import java.util.List;

import com.manipal.model.LeaderBoard;
import com.manipal.model.Match;
import com.manipal.model.Result;


public interface ISystemService {

	public void UpdateTeamStandings(Match match);

	public List<LeaderBoard> Leaderboard();

	public void UpdateBidderPoints(Match match);

	//public void updateMatchStat();

	//public Result declareResults();

	public List<LeaderBoard> sendUpdatesToUser(Match match);

	public void flushPointsTable();

}
