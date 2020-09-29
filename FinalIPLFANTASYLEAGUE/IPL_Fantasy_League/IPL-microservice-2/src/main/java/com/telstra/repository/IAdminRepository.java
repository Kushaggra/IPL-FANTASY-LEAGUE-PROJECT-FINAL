package com.telstra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.telstra.model.Admin;

@Repository
public interface IAdminRepository extends JpaRepository<Admin, Integer>{

	public Admin findByUserNameAndPassword(String userName, String password);
	public Admin findByUserName(String userName);
}
