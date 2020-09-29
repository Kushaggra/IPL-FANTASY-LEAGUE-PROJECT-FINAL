package com.manipal.model;

public class LeaderBoardListElement {
	
	private int position;
	private String name;
	private int points;
	
	public LeaderBoardListElement() {}
	
	public LeaderBoardListElement(int position, String name, int points) {
		super();
		this.position = position;
		this.name = name;
		this.points = points;
	}

	public int getPosition() {
		return position;
	}

	public void setPosition(int position) {
		this.position = position;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPoints() {
		return points;
	}

	public void setPoints(int points) {
		this.points = points;
	}

	@Override
	public String toString() {
		return "LeaderBoardListElement [position=" + position + ", name=" + name + ", points=" + points + "]";
	}
	
}
