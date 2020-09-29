package com.manipal.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

//add entity and primary key

@Entity
@Table(name="leaderboards")
public class LeaderBoard {


	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "bidder_id")
	private int bidderId;
	@Column(name="bids_participated")
	private int bidsParticipated;
	@Column(name="bids_won")
	private int bidsWon;
	@Column(name="bids_lost")
	private int bidsLost;
	@Column(name="percentile")
	private double percentile;
	@Column(name="bidder_ranking")
	private int bidderRanking;
	@Column(name="point")
	private int point;               // this one is added please look

	
	public LeaderBoard(int bidderId, int bidsParticipated, int bidsWon, int bidsLost, double percentile, int bidder_ranking,
			int point) {
		super();
		this.bidderId = bidderId;
		this.bidsParticipated = bidsParticipated;
		this.bidsWon = bidsWon;
		this.bidsLost = bidsLost;
		this.percentile = percentile;
		this.bidderRanking = bidder_ranking;
		this.point = point;


	}

	public LeaderBoard() {}
	
	public int getBidderId() {
		return bidderId;
	}
	public void setBidderId(int bidderId) {
		this.bidderId = bidderId;
	}
	public int getBidsParticipated() {
		return bidsParticipated;
	}
	public void setBidsParticipated(int bidsParticipated) {
		this.bidsParticipated = bidsParticipated;
	}
	public int getBidsWon() {
		return bidsWon;
	}
	public void setBidsWon(int bidsWon) {
		this.bidsWon = bidsWon;
	}
	public int getBidsLost() {
		return bidsLost;
	}
	public void setBidsLost(int bidsLost) {
		this.bidsLost = bidsLost;
	}
	public double getPercentile() {
		return percentile;
	}
	public void setPercentile(double percentile) {
		this.percentile = percentile;
	}
	public int getBidder_ranking() {
		return bidderRanking;
	}
	public void setBidder_ranking(int bidder_ranking) {
		this.bidderRanking = bidder_ranking;
	}
	public int getPoint() {
		return point;
	}
	public void setPoint(int point) {
		this.point = point;
	}

	@Override
	public String toString() {
		return "LeaderBoard [bidderId=" + bidderId + ", bidsParticipated=" + bidsParticipated + ", bidsWon=" + bidsWon
				+ ", bidsLost=" + bidsLost + ", percentile=" + percentile + ", bidder_ranking=" + bidderRanking
				+ ", point=" + point + "]";
	}


}
