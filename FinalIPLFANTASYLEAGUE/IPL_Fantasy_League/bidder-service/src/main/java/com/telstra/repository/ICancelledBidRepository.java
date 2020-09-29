package com.telstra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.telstra.model.Bid;
import com.telstra.model.CancelledBid;

public interface ICancelledBidRepository extends JpaRepository<CancelledBid,Integer>{
	
public List<Bid> findByMatchId(int matchId);
	List<Bid> findByBidderIdAndMatchId(int bidderId, int matchId);
	List<Bid> findByBidderId(int bidderId);
	List<Bid> findByBidderIdOrderByMatchIdAsc(int bidderId);
}	
