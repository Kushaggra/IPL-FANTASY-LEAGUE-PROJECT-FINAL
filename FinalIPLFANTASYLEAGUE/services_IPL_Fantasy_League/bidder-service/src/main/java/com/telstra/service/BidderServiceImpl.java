package com.telstra.service;

import java.math.MathContext;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.telstra.exception.BidderResponseEntityExceptionHandler;
import com.telstra.exception.ConflictException;
import com.telstra.exception.GoneException;
import com.telstra.exception.NotFoundException;
import com.telstra.exception.UnauthorizedException;
import com.telstra.model.Bid;
import com.telstra.model.Bidder;
import com.telstra.model.CancelledBid;
import com.telstra.model.LeaderBoard;
import com.telstra.model.LeaderBoardListElement;
import com.telstra.model.Match;
import com.telstra.model.Team;
import com.telstra.repository.IBidRepository;
import com.telstra.repository.IBidderRepository;
import com.telstra.repository.ICancelledBidRepository;
import com.telstra.repository.ILeaderBoardRepository;
import com.telstra.repository.IMatchRepository;
import com.telstra.repository.ITeamRepository;

@Service
public class BidderServiceImpl implements IBidderService {

	Logger logger = LoggerFactory.getLogger(BidderServiceImpl.class);

	@Autowired IBidderRepository bidderRepository;
	@Autowired IMatchRepository matchRepository;
	@Autowired IBidRepository bidRepository;
	@Autowired ICancelledBidRepository cancelledBidRepository;
	@Autowired ILeaderBoardRepository leaderBoardRepository;
	@Autowired ITeamRepository teamRepository;


	@Override
	public Bidder addUser(Bidder bidder) {
		logger.debug("Finding by username");
		List<Bidder> bidderDb = bidderRepository.findByUserName(bidder.getUserName());
		logger.debug("Finding by email");
		List<Bidder> emailDb = bidderRepository.findByEmail(bidder.getEmail());
		logger.debug("Checking if bidder already exists");
		if (bidderDb.size() == 0 && emailDb.size() == 0) {
			String hashedPassword = BCrypt.hashpw(bidder.getPassword(), BCrypt.gensalt());
			bidder.setPassword(hashedPassword);
			logger.info("{} is being added to the db",bidder);
			Bidder bidderNew = bidderRepository.save(bidder);
			logger.info("{} is added to the db",bidderNew);
			leaderBoardRepository.save(new LeaderBoard(bidderNew.getBidderId(), 0, 0, 0, 0, 0,0));
			return bidderNew;
		}
		else {
			logger.error("Duplicate username");
			throw new ConflictException(bidder.getUserName()+" already exists. Choose a different username.");
		}
	}
	
	public void enable(int bidderId) {
		Bidder bidder = bidderRepository.findById(bidderId).orElse(null);
		logger.info("Bidder found");
		bidder.setIsEnabled(true);
		bidderRepository.save(bidder);
	}
	
	public Bidder verifyUser(String username, String email) {
		List<Bidder> bidder = bidderRepository.findByUserName(username);
		logger.info("Searching for Bidder");
		if (bidder.size() == 0) {
			throw new NotFoundException("User not found");
		}
		else	{
			if(bidder.get(0).getUserName().equals(username) && bidder.get(0).getEmail().equals(email)) {
				logger.info("Found matching email");
				return bidder.get(0);
			}
			else {
				throw new ConflictException("Username and Email not corresponding to same record");
			}
		}
	}
	
	public List<String> getEmails(){
		List<Bidder> bidders = bidderRepository.findAll();
		List<String> emails = new ArrayList<String>();
		for(Bidder bidder: bidders) {
			emails.add(bidder.getEmail());
		}
		logger.info("Sending list of emails");
		return emails;
	}
	
	public List<String> getUsernames(){
		List<Bidder> bidders = bidderRepository.findAll();
		List<String> usernames = new ArrayList<String>();
		for (Bidder bidder: bidders) {
			usernames.add(bidder.getUserName());
		}
		logger.info("Sending list of usernames");
		return usernames;
	}
	
	public Bidder getBidder(int bidderId) {
		return bidderRepository.findById(bidderId).orElseThrow(() -> new NotFoundException("Bidder Id not found"));
	}
	
	public void changePassword(int bidderId, String password) {
		Bidder bidder = getBidder(bidderId);
		String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
		bidder.setPassword(hashedPassword);
		bidderRepository.save(bidder);
	}
	
	@Override
	public int login(String username, String password) {
		List<Bidder> bidder = bidderRepository.findByUserName(username);
		if (bidder.size() != 0) {
			logger.info("Bidder found");
			if (BCrypt.checkpw(password, bidder.get(0).getPassword())) {
				logger.info("Correct credentials");
				return bidder.get(0).getBidderId();
			}
			else {
				logger.error("Password is invalid");
				throw new UnauthorizedException("Password is invalid");
			}
		}
		else
			logger.error("Username not found");
		throw new NotFoundException("Username not found");
	}


	@Override
	public Bid bid(Bid bid) {
		//Verify bidder
		Bidder bidder = bidderRepository.findById(bid.getBidderId()).orElse(null);
		if (bidder!=null) {
			logger.info("Bidder found");
			//Verify match
			Match match = matchRepository.findById(bid.getMatchId()).orElse(null);
			if(match!=null) {
				logger.info("Match found");
				//Check team playing
				if(match.getTeamOne().equals(bid.getTeamBidded()) || match.getTeamTwo().equals(bid.getTeamBidded())) {
					logger.info("Team is playing");
					LocalDateTime now = LocalDateTime.now();
					String matchDT= match.getDate()+"T"+match.getTime();
					LocalDateTime dt = LocalDateTime.parse(matchDT);
					if (now.isBefore(dt)) {
						logger.info("Match hasn't started yet");
						//Check existing bid
						List<Bid> existing = bidRepository.findByBidderIdAndMatchId(bid.getBidderId(), bid.getMatchId());
						if(existing.size() == 0) {
							logger.info("Bid added");
							return bidRepository.save(bid);
						}
						else {
							bid.setBidId(existing.get(0).getBidId());
							logger.info("Bid updated");
							return bidRepository.save(bid);
						}
					}
					else {
						logger.error("Match has started");
						throw new GoneException("Match has started");
					}
				}
				else {
					logger.error("Team isn't playing");
					throw new ConflictException(bid.getTeamBidded()+" isn't playing. Choose either "+match.getTeamOne()+" or "+match.getTeamTwo());
				}
			}
			else {
				logger.error("Match not found");
				throw new NotFoundException("Match not found");
			}
		}
		else {
			logger.error("Invalid bidderId");
			throw new NotFoundException("bidderId not found");
		}
	}

	@Override
	public List<LeaderBoardListElement> getLeaderBoard(int bidderId){
		Bidder bidder = bidderRepository.findById(bidderId).orElse(null);
		if (bidder!=null) {
			logger.info("Bidder found");
			List<LeaderBoard> leaderboard = leaderBoardRepository.findAllByOrderByPointDesc();
			List<LeaderBoardListElement> position = new LinkedList<LeaderBoardListElement>();
			int rank = 1;
			for (LeaderBoard l: leaderboard) {
				if (rank <= 3 || l.getBidderId()==bidderId) {
					position.add(new LeaderBoardListElement(rank, (bidderRepository.findById(l.getBidderId()).orElse(null)).getName(), l.getPoint()));
				}
				rank++;
			}
			return position;
		}
		else
			logger.error("Invalid bidderId");
		throw new NotFoundException("bidderId not found");
	}

	@Override
	public List<Team> getTeamPoints(int bidderId){
		Bidder bidder = bidderRepository.findById(bidderId).orElse(null);
		if (bidder!=null) {
			logger.info("Bidder found");
			return teamRepository.findAllByOrderByRankingAsc();
		}
		else {
			logger.error("Invalid bidderId");
			throw new NotFoundException("bidderId not found");
		}
	}

	public List<Match> getMatches() {
		return matchRepository.findAll();
	}

	public Match getMatchDetails(int matchId) {
		return matchRepository.findById(matchId).orElse(null);
	}
	
	@Override
	public List<Bid> getAllBidsPlaced(int bidderId){
		Bidder bidder = bidderRepository.findById(bidderId).orElse(null);
		if (bidder!=null) {
			logger.info("Bidder found");
			return bidRepository.findByBidderIdOrderByMatchIdAsc(bidderId);
		}
		else {
			logger.error("Invalid bidderId");
			throw new NotFoundException("bidderId not found");
		}
	}

	@Override
	public void deleteBid(int bidderId, int bidId) {
		if(bidderRepository.findById(bidderId).orElse(null)!=null) {
			Bid bid = bidRepository.findById(bidId).orElse(null);
			if (bid!=null) {
				if(bid.getBidderId()==bidderId) {
					logger.info("Bid found");
					Match match = matchRepository.findById(bid.getMatchId()).orElse(null);
					if(match!=null) {
						logger.info("Match found");
						LocalDateTime now = LocalDateTime.now();
						String matchDT= match.getDate()+"T"+match.getTime();
						LocalDateTime dt = LocalDateTime.parse(matchDT);
						if (now.isBefore(dt)) {
							logger.info("Match hasn't started yet");
							bidRepository.delete(bid);
							CancelledBid cancel = new CancelledBid(bid.getBidId(), bid.getBidderId(), bid.getMatchId(), bid.getTeamBidded());
							cancelledBidRepository.save(cancel);
							
						}
						else {
							logger.error("Match has started");
							throw new GoneException("Match has started");
						}
					}
					else {
						logger.error("Match not found");
						throw new NotFoundException("Match not found");
					}
				}
				else {
					logger.error("BidderId and BidId not corresponding to the same record");
					throw new NotFoundException("BidderId and BidId not matching the same record");
				}
			}
			else {
				logger.error("Invalid bidId");
				throw new NotFoundException("bidId not found");
			}
		}
		else {
			logger.error("Invalid bidderId");
			throw new NotFoundException("bidderId not found");
		}
	}

	

	
	

}
