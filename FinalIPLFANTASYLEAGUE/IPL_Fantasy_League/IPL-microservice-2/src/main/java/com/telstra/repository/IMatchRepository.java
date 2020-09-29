package com.telstra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.telstra.model.Match;


@Repository
public interface IMatchRepository extends JpaRepository<Match, Integer>{

}
