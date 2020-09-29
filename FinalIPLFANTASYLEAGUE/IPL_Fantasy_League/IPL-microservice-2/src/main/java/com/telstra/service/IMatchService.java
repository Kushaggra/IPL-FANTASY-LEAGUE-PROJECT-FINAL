package com.telstra.service;

import java.util.List;

import com.telstra.model.Match;

public interface IMatchService {

	void addOrUpdateMatch(Match match);
	public String addMatch(Match match);
	public List<Match> getAllMatches();

	
	public Match getMatchbyId(int matchId);
}
