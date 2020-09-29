package com.telstra;

import java.util.Collections;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.telstra.controller.BidderController;
import com.telstra.model.Bidder;
import com.telstra.repository.IBidderRepository;

//@ExtendWith(SpringExtension.class)
@WebMvcTest(BidderController.class)
public class BidderControllerTest {

	@Autowired
	private MockMvc mvc;
	
	@MockBean
	IBidderRepository bidderRepository; 
	
	
	void register() throws Exception {
		String username = "test";
		String email = "test@gmail.com";
		Mockito.when(bidderRepository.findByUserName(username)).thenReturn(Collections.emptyList());
		Mockito.when(bidderRepository.findByEmail(email)).thenReturn(Collections.emptyList());
		Bidder bidder = new Bidder(1, username, "test", "Tester", email, "9987654321", false);
		RequestBuilder request = MockMvcRequestBuilders.post("/bidder/register", bidder).accept(MediaType.APPLICATION_JSON);
		MvcResult result = mvc.perform(request).andReturn();
		System.out.println(result.getResponse());
		//Expect(MockMvcResultMatchers.status().isOk())
		//result.getResponse().getContentAsString()
		Mockito.verify(bidderRepository).findByEmail(email);
		Mockito.verify(bidderRepository).findByUserName(username);
	}
	
}
