package com.telstra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.telstra.model.Bid;

public interface IBidRepository extends JpaRepository<Bid,Integer>{
	
public List<Bid> findByMatchId(int matchId);
	List<Bid> findByBidderIdAndMatchId(int bidderId, int matchId);
	List<Bid> findByBidderId(int bidderId);
	List<Bid> findByBidderIdOrderByMatchIdAsc(int bidderId);
}	
