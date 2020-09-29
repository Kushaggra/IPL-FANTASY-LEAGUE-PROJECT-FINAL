package com.telstra.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.telstra.model.Bidder;
import com.telstra.repository.IBidderRepository;

@Service
public class BidderService implements IBidderService{
	
	@Autowired
	private IBidderRepository repository;

	@Override
	public List<Bidder> getAllBidders() {
		return repository.findAll();

	}







}
