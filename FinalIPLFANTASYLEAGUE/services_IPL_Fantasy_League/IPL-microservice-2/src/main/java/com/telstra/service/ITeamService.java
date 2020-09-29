package com.telstra.service;

import java.util.List;

import com.telstra.model.MatchStats;
import com.telstra.model.Team;

public interface ITeamService {
	public String addTeam(Team bean);

	public List<Team> getAllTeamdetails();
	public int getCount();

	public String deleteTeam(String teamName);

	public Team getTeambyName(String teamName);

	public String setStats(MatchStats matchStats);
}
