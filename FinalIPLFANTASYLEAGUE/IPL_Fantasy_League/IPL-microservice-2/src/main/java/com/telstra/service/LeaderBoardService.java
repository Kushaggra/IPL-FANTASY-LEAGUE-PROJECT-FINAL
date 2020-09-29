package com.telstra.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.telstra.model.LeaderBoard;
import com.telstra.repository.ILeaderBoardRepository;

@Service
public class LeaderBoardService implements ILeaderBoard {

	@Autowired
	ILeaderBoardRepository repository;
	
	@Override
	public List<LeaderBoard> getAll() {
		return repository.findAll();
	}

}
