package com.telstra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.telstra.model.Result;
@Repository
public interface ResultRepository extends JpaRepository<Result,Integer>{

}
