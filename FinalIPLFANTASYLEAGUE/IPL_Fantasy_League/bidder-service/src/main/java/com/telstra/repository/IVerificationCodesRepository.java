package com.telstra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.telstra.model.VerificationCode;

@Repository
public interface IVerificationCodesRepository extends JpaRepository<VerificationCode, Integer>{
	
}
