package com.telstra.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.telstra.exception.NotFoundException;
import com.telstra.model.Bidder;
import com.telstra.repository.IBidderRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class MyUserDetailsService implements UserDetailsService {
	
	@Autowired
	private IBidderRepository repository;
	
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    	List<Bidder> bidder = repository.findByUserName(username);
    	if (bidder.size()==0) {
    		throw new NotFoundException("Invalid Username");
    	}
    	else {
    		System.out.println(bidder.get(0));
        	return new User(bidder.get(0).getUserName(), bidder.get(0).getPassword(), new ArrayList());
    	}
    }
}