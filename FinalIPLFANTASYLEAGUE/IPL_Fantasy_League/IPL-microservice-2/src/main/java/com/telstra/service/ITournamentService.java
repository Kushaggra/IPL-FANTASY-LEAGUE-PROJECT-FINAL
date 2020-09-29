package com.telstra.service;

import com.telstra.model.Tournaments;

public interface ITournamentService {

	public void addTournament(Tournaments tournament);
	public void UpdateTournament(Tournaments tournament);
	public Tournaments getCurrentTournament();
}
