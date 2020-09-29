package com.manipal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.manipal.model.LeaderBoard;

@Repository
public interface LeaderBoardRepository extends JpaRepository<LeaderBoard, Integer> {

	//Old" public List<LeaderBoard> OrderByBidder_rankingDsc();

	// Gaurav:public List<LeaderBoard> findByOrderByBidder_rankingDsc();
	// R may be smaller or greater

	public List<LeaderBoard> findAllByOrderByBidderRankingDesc();
	public List<LeaderBoard> findAllByOrderByBidderRankingAsc();

	public List<LeaderBoard> findAllByOrderByPointDesc();

}
