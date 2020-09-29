package com.telstra.service;

import java.util.List;

import com.telstra.model.Bid;
import com.telstra.model.Bidder;
import com.telstra.model.LeaderBoardListElement;
import com.telstra.model.Team;

public interface IBidderService {
	
	Bidder addUser(Bidder bidder);
	int login(String email, String password);
	Bid bid(Bid bid);
	List<LeaderBoardListElement> getLeaderBoard(int bidderId);
	List<Team> getTeamPoints(int bidderId);
	List<Bid> getAllBidsPlaced(int bidderId);
	void deleteBid(int bidderId, int bidId);
}
