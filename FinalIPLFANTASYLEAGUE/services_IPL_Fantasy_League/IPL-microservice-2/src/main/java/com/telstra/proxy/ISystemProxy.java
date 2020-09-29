package com.telstra.proxy;

import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import com.telstra.model.Match;
import com.telstra.model.MatchStats;


@FeignClient(name = "system-service")
@RibbonClient(name = "system-service")
public interface ISystemProxy {

	@PostMapping("updateTeamStanding")
	public String UpdateTeamStanding(@RequestBody Match match);
	
	@PostMapping("updatebidderpoints")
	public String UpdateBidderPoints(@RequestBody Match match);
	
	@GetMapping("flush")
	public String resetTeamPoint();

    @PostMapping("/updatematchstat")
    public void updateMatchStat(@RequestBody MatchStats matchStats);
}




