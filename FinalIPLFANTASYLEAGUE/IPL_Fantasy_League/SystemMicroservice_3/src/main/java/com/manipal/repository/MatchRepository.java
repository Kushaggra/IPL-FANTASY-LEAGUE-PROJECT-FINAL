package com.manipal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.manipal.model.Match;



@Repository
public interface MatchRepository extends JpaRepository<Match, Integer> {

}
