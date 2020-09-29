package com.telstra.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.telstra.exceptionpack.AdminNotFoundException;
import com.telstra.model.Tournaments;
import com.telstra.repository.ITournamentRepository;

@Service
public class TournamentService implements ITournamentService {

	@Autowired
	ITournamentRepository repository;
	
	@Override
	public void addTournament(Tournaments tournament) {
//		repository.deleteAll();
		List<Tournaments> list=repository.findAll();
		
		for(Tournaments t : list) {
			t.setStatus(0);
		}
		
		repository.saveAll(list);
		
		repository.save(tournament);
	}
	
	@Override
	public void UpdateTournament(Tournaments tournament) {
		Tournaments t = repository.findById(tournament.getTournamentId()).orElse(null);
		if(t!=null) {
			repository.save(tournament);
		}else
			throw new AdminNotFoundException("Tournament with this ID doesn't exist!");
		
	}
	
	@Override
	public Tournaments getCurrentTournament() {
		
		List<Tournaments> list = repository.findAll();
		if(list.size()==0)
			return null;
		else {
			return repository.findByStatus(1);
		}
	}
	
 
}
