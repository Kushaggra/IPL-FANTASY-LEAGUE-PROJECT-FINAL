package com.telstra.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.telstra.model.Admin;
import com.telstra.repository.IAdminRepository;

@Service
public class MyUserDetailsService implements UserDetailsService {

	@Autowired
	IAdminRepository adminUser;
	
	
	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		
		Admin admin=adminUser.findByUserName(userName);
		return new User(admin.getUserName(),admin.getPassword(), new ArrayList<>());
		
	}

}
