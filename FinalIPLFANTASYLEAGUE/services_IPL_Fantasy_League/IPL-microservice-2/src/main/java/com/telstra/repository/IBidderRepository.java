package com.telstra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.telstra.model.Bidder;

@Repository
public interface IBidderRepository extends JpaRepository<Bidder, Integer>{

}
