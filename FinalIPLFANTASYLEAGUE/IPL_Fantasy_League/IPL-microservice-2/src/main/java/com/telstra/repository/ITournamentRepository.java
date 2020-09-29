package com.telstra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.telstra.model.Tournaments;

@Repository
public interface ITournamentRepository extends JpaRepository<Tournaments, Integer>{

	public Tournaments findByStatus(int status);
}
