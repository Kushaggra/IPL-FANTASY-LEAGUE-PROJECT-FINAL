package com.telstra.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.telstra.exceptionpack.AdminNotFoundException;
import com.telstra.model.Admin;
import com.telstra.model.Result;
import com.telstra.repository.IAdminRepository;

@Service
public class AdminService implements IAdminService{

	
	
	
	@Autowired
	private IAdminRepository repository;
	
	
	@Override
	public int getAdminId(Admin obj) {
		Admin admin = repository.findByUserNameAndPassword(obj.getUserName(), obj.getPassword());
		if(admin!=null) {
			return admin.getAdminId();
		}else 
			throw new AdminNotFoundException("Admin doesn't exist");
	}
	
	
	@Override
	public Admin getAdminById(int ID) {
		Admin admin = repository.findById(ID).orElse(null);
		if(admin!=null)
			return admin;
		else
			return null;
	}

}
