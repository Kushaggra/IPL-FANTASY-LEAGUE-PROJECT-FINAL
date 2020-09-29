package com.telstra;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Collections;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.telstra.exception.ConflictException;
import com.telstra.model.Bidder;
import com.telstra.model.LeaderBoard;
import com.telstra.repository.IBidderRepository;
import com.telstra.repository.ILeaderBoardRepository;
import com.telstra.service.BidderServiceImpl;

//@RunWith(MockitoJUnitRunner.class)
@ExtendWith(SpringExtension.class)
@DisplayName("Register service for")
public class BidderServiceTest {
	
	@Mock
	IBidderRepository bidderRepository; 
	
	@Mock
	ILeaderBoardRepository leaderBoardRepository;
	
	@InjectMocks
	private BidderServiceImpl bidderService;
	
	@BeforeEach
	void initEach() {
		//bidderService = mock(BidderServiceImpl.class);
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	@DisplayName(" new user")
	void register() throws Exception {
		String username = "test";
		String email = "test@gmail.com";
		
		Bidder bidder = new Bidder(0, username, "test", "Tester", email, "9987654321", false);
		Bidder given = new Bidder(0, username, "test", "Tester", email, "9987654321", false);
		when(bidderRepository.findByUserName(bidder.getUserName())).thenReturn(Collections.emptyList());
		when(bidderRepository.findByEmail(bidder.getEmail())).thenReturn(Collections.emptyList());
		when(leaderBoardRepository.save(Mockito.any())).thenReturn(null);
		when(bidderRepository.save(bidder)).thenReturn(bidder);
		
		System.out.println(Collections.emptyList());
		Bidder created = bidderService.addUser(bidder);

		assertNotEquals(" should hash password", created.getPassword(),given.getPassword());
		
		verify(bidderRepository).findByEmail(Mockito.anyString());
		verify(bidderRepository).findByUserName(Mockito.anyString());
		verify(bidderRepository).save(bidder);
		verify(leaderBoardRepository).save(Mockito.any());
	}
	
	@Test
	@DisplayName(" existing user")
	void registerExisting() throws Exception {
		String username = "test";
		String email = "test@gmail.com";
		
		Bidder bidder = new Bidder(100, username, "test", "Tester", email, "9987654321", false);
		when(bidderRepository.findByUserName(Mockito.anyString())).thenReturn(Collections.singletonList(new Bidder()));
		when(bidderRepository.findByEmail(Mockito.anyString() )).thenReturn(Collections.singletonList(new Bidder()));
		
		assertThrows(ConflictException.class, () -> bidderService.addUser(bidder), " should throw");
		
		Mockito.verify(bidderRepository).findByEmail(Mockito.anyString());
		Mockito.verify(bidderRepository).findByUserName(Mockito.anyString());
	}
	
}
