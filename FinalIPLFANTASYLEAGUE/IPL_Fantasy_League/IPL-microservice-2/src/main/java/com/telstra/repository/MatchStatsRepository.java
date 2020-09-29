package com.telstra.repository;

import java.util.List;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.telstra.model.MatchStats;

 

@Repository
public interface MatchStatsRepository extends JpaRepository<MatchStats,Integer>{
	List<MatchStats> findByMatchId(int id);
     List<MatchStats> findByTeamName(String name);
     List<MatchStats> findByOrderByRunRateAsc();
     
}