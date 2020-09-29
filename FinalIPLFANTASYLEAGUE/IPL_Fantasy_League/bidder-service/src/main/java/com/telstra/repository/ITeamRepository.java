package com.telstra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.telstra.model.Team;





public interface ITeamRepository extends JpaRepository<Team, Integer> {
	
  Team findTeamByTeamName(String tname);
  List<Team> findAllByOrderByPointsAsc();
List<Team> findAllByOrderByRankingAsc();
}
