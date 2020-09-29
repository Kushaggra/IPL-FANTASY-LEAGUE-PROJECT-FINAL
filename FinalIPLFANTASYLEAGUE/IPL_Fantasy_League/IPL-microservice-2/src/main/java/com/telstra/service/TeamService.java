package com.telstra.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.telstra.model.MatchStats;
import com.telstra.model.Result;
import com.telstra.model.Team;
import com.telstra.repository.ITeamRepository;
import com.telstra.repository.ResultRepository;

@Service
public class TeamService implements ITeamService{
	
	@Autowired
	ITeamRepository repository;
	
	@Autowired
	ResultRepository resultRepository;

	@Override
	public Team getTeambyName(String teamName) {
		return repository.findByTeamName(teamName);
	}
	
	@Override
	public String setStats(MatchStats matchStats) {
	
		Team team =repository.findByTeamName(matchStats.getTeamName());
		team.setStatistics("Run Rate: "+matchStats.getRunRate());
		repository.save(team);
		return "Team Statistics Updated";
	}
	
	@Override
	public String addTeam(Team bean) {
		
		Team obj=repository.findByTeamName(bean.getTeamName());
		if(obj==null) {
			repository.save(bean);
			
		}else {
			obj.setStatus(1);
			repository.save(obj);
			
		}
			
		return "Team Added Successfully !";
			
	}
	
	@Override
	public List<Team> getAllTeamdetails() {
		return repository.findAllByStatus(1);
	}
	
	public Result declareResults() {
		  
		Result result =new Result();
		List<Team> teams=repository.findByOrderByPointsDesc();
		List<Team> list = new ArrayList<Team>();
		
		for(Team t: teams) {
			if(t.getStatus()==1) 
				list.add(t);
		}
		
			result.setFirstTeam(list.get(0).getTeamName()+" Score is :"+list.get(0).getPoints());
			result.setSecondTeam(list.get(1).getTeamName()+" Score is :"+list.get(1).getPoints());
			result.setThirdTeam(list.get(2).getTeamName()+" Score is :"+list.get(2).getPoints());
		
			resultRepository.deleteAll();
			resultRepository.save(result);
		
		return result;
	}

	@Override
	public int getCount() {
		// TODO Auto-generated method stub
		List<Team> list = repository.findAll();
		int count =0;
		for(Team t : list) {
			if(t.getStatus()==1)
				++count;
		}
		
		return count;
	}


	@Override
	public String deleteTeam(String teamName) {
		Team obj=repository.findByTeamName(teamName);
		if(obj==null)
			return "Team with name "+teamName +" doesn't exist!";
		else {
			obj.setStatus(0);
			repository.save(obj);
			return "Team "+teamName+" deleted successfully!";
		}
		
	}

}
