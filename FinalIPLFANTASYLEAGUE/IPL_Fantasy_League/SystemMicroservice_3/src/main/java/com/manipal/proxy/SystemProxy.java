package com.manipal.proxy;
import java.util.List;

import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.manipal.model.Bidder;
import com.manipal.model.Result;


@FeignClient(name = "IPL-microservice-1")
@RibbonClient(name = "IPL-microservice-1")

public interface SystemProxy {


// @GetMapping("/from/{from}/to/{to}")
@GetMapping("admin/{adminId}/getBidders")
public List<Bidder> getBidder(@PathVariable String userName, @PathVariable String password);



@GetMapping("admin/{adminId}/declareresults")
public Result declareResults(@PathVariable String userName, @PathVariable String password);

}

