package com.manipal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.manipal.model.Bidder;

@Repository
public interface BidderRepository extends JpaRepository<Bidder, Integer>{

}
