package com.telstra.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="cancelled_bids")
public class CancelledBid {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="bid_id")
	private int bidId;
	@Column(name="bidder_id")
	private int bidderId;
	@Column(name="match_id")
	private int matchId;
	@Column(name="team_bidded")
	private String teamBidded;	//teamName


	public CancelledBid() {}

	public CancelledBid(int bidId, int bidderId, int matchId, String teamBidded) {
		super();
		this.bidId = bidId;
		this.bidderId = bidderId;
		this.matchId = matchId;
		this.teamBidded = teamBidded;	
	}

	public int getBidId() {
		return bidId;
	}

	public void setBidId(int bidId) {
		this.bidId = bidId;
	}

	public int getBidderId() {
		return bidderId;
	}

	public void setBidderId(int bidderId) {
		this.bidderId = bidderId;
	}

	public int getMatchId() {
		return matchId;
	}

	public void setMatchId(int matchId) {
		this.matchId = matchId;
	}

	public String getTeamBidded() {
		return teamBidded;
	}

	public void setTeamBidded(String teamBidded) {
		this.teamBidded = teamBidded;
	}

	@Override
	public String toString() {
		return "Bid [bidId=" + bidId + ", bidderId=" + bidderId + ", matchId=" + matchId + ", teamBidded=" + teamBidded
				+ "]";
	}




}
