package com.manipal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manipal.model.Result;
import org.springframework.stereotype.Repository;
@Repository
public interface ResultRepository extends JpaRepository<Result,Integer>{

}
