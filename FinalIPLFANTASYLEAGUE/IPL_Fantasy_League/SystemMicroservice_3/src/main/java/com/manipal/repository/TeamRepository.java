package com.manipal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.manipal.model.Team;


@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {

	Team findTeamByTeamName(String teamName);

	List<Team> findByOrderByPointsDesc();

	List<Team> findByOrderByRankingAsc();
	
}
