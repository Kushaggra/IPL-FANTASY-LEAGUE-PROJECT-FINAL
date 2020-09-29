package com.manipal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.manipal.model.Bid;

@Repository
public interface BidRepository extends JpaRepository<Bid, Integer> {
	public List<Bid> findByMatchId(int matchId);
	
}
