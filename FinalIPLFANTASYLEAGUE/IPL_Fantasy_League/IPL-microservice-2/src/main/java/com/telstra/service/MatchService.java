package com.telstra.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.telstra.exceptionpack.AdminNotFoundException;
import com.telstra.model.Match;
import com.telstra.repository.IMatchRepository;

@Service
public class MatchService implements IMatchService {

	@Autowired 
	IMatchRepository repository;

	@Override
	public void addOrUpdateMatch(Match match) {
		repository.save(match);
	}

	@Override
	public String addMatch(Match match) {
		List<Match> existingMatches = repository.findAll();
		if(match.getTeamOne().equalsIgnoreCase(match.getTeamTwo()))
            return "A Team cannot have a Match with itself!";
		for(Match match1: existingMatches) {
			if((match1.getTeamOne().equals(match.getTeamOne()) && match1.getTeamTwo().equals(match.getTeamTwo())) || (match1.getTeamOne().equals(match.getTeamTwo()) && match1.getTeamTwo().equals(match.getTeamOne()))) {
				return  "Match between teams already happened!";
			}
		}
		repository.save(match);	
		
		return  "Match scheduled";
	}
	
	
	@Override
	public List<Match> getAllMatches(){
		List<Match> existingMatches = repository.findAll();
		if(existingMatches==null||existingMatches.isEmpty()) {
			throw new AdminNotFoundException("No Matches currently Scheduled!");
		}
		else
			return existingMatches;
	}
	
	
	  @Override
	    public Match getMatchbyId(int matchId) {
	        return repository.findById(matchId).orElse(null);
	       
	    }
	
}
