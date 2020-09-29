package com.telstra.controller;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.util.WebUtils;

import com.telstra.exception.ConflictException;
import com.telstra.exception.NotFoundException;
import com.telstra.exception.UnauthorizedException;
import com.telstra.model.AuthenticationRequest;
import com.telstra.model.AuthenticationResponse;
import com.telstra.model.Bid;
import com.telstra.model.BidMatch;
import com.telstra.model.Bidder;
import com.telstra.model.LeaderBoardListElement;
import com.telstra.model.Match;
import com.telstra.model.Team;
import com.telstra.model.VerificationCode;
import com.telstra.repository.IVerificationCodesRepository;
import com.telstra.service.BidderServiceImpl;
import com.telstra.service.EmailServiceImpl;
import com.telstra.service.MyUserDetailsService;
import com.telstra.util.JwtUtil;

@Controller
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("bidder")
public class BidderController {

	@Autowired
	BidderServiceImpl service;
	
	@Autowired
	private IVerificationCodesRepository verifyRepo;
	
	@PostMapping("register")
	public ResponseEntity<?> addUser(@RequestBody Bidder bidder, HttpServletResponse response){
		Random random = new Random();
		String text = String.valueOf(random.nextInt(999999 - 100000) + 100000);
		
		Bidder bidderSaved = service.addUser(bidder);
		sendVerification(bidder.getEmail(), text);
		verifyRepo.save(new VerificationCode(bidderSaved.getBidderId(), Integer.parseInt(text)));
		final UserDetails userDetails = userDetailsService.loadUserByUsername(bidder.getUserName());

		final String jwt = jwtTokenUtil.generateToken(userDetails);
		
		// create a cookie
	    Cookie cookie = new Cookie("JWT", jwt);
	    cookie.setMaxAge(10 * 60 * 60);
	    cookie.setPath("/");
	    cookie.setHttpOnly(true);
	    //add cookie to response
	    response.addCookie(cookie);
	    
		return ResponseEntity.ok("User created");
	}

	
	
	@PostMapping("verify")
	public ResponseEntity<?> verify(HttpServletRequest request, @RequestBody Map<String,String> code){
		System.out.println("RECEIVED REQUEST");
		final Cookie JWT = WebUtils.getCookie(request, "JWT");

		int bidderId = 0;
		String jwt = null;
		if (JWT != null) {
			jwt = JWT.getValue();
			bidderId = jwtTokenUtil.extractBidderId(jwt);
		}
		System.out.println("RETRIEVED BIDDER ID");
		VerificationCode verificationCode = verifyRepo.findById(bidderId).orElse(null);
		System.out.println("RETRIEVED VCODE");
		System.out.println(code.get("code"));
		if(verificationCode.getCode() == Integer.parseInt(code.get("code"))) {
			service.enable(bidderId);
			System.out.println("USER IS ENABLED");
			return ResponseEntity.ok("User is enabled");
		}
		else
			throw new ConflictException("Code isn't matching");
	}
	
	@GetMapping("resend")
	public ResponseEntity<?> resendCode(HttpServletRequest request){
		final Cookie JWT = WebUtils.getCookie(request, "JWT");

		int bidderId = 0;
		String jwt = null;
		if (JWT != null) {
			jwt = JWT.getValue();
			bidderId = jwtTokenUtil.extractBidderId(jwt);
		}

		Random random = new Random();
		String text = String.valueOf(random.nextInt(999999 - 100000) + 100000);
		sendVerification(service.getBidder(bidderId).getEmail(), text);
		verifyRepo.save(new VerificationCode(bidderId, Integer.parseInt(text)));
		return ResponseEntity.ok("Code resent");
	}
	
	@PostMapping("reset_password")
	public ResponseEntity<?> resetPassword(@RequestBody Map<String,String> user){
		
		Bidder bidder = service.verifyUser(user.get("username"),user.get("email"));
		Random random = new Random();
		String text = String.valueOf(random.nextInt(999999 - 100000) + 100000);
		service.changePassword(bidder.getBidderId(), text);	
		sendPassword(bidder.getEmail(), text);
		return ResponseEntity.ok(new String("Password has been changed"));
	}
	
	
	@PostMapping("change_password")
	public ResponseEntity<?> changePassword(HttpServletRequest request, @RequestBody Map<String,String> passwords){
		final Cookie JWT = WebUtils.getCookie(request, "JWT");

		int bidderId = 0;
		String jwt = null;
		if (JWT != null) {
			jwt = JWT.getValue();
			bidderId = jwtTokenUtil.extractBidderId(jwt);
		}
		
		Bidder bidder = service.getBidder(bidderId);
		if(BCrypt.checkpw(passwords.get("oldPassword"), bidder.getPassword())){
			service.changePassword(bidder.getBidderId(), passwords.get("newPassword"));	
			return ResponseEntity.ok(new String("Password changed"));
		}
		else {
			throw new ConflictException("Passwords don't match");
		}
	}
	
	@PostMapping("check_email")
	public ResponseEntity<?> checkEmail(@RequestBody Map<String,String> emails){	
		System.out.println(emails.get("email"));
		List<String> existingEmails = service.getEmails();
		boolean existing = existingEmails.contains(emails.get("email"));
		if(existing)
			throw new ConflictException("Email already exists");
		else
			return ResponseEntity.ok(new String("Email doesn't exist"));
	}
	
	@PostMapping("check_username")
	public ResponseEntity<?> checkUsername(@RequestBody Map<String,String> usernames){
		System.out.println(usernames.get("userName"));
		List<String> existingUsernames = service.getUsernames();
		boolean existing = existingUsernames.contains(usernames.get("userName"));
		if(existing)
			throw new ConflictException("Username already exists");
		else
			return ResponseEntity.ok(new String("Username doesn't exist"));
	}
	
	@GetMapping("details")
	public ResponseEntity<?> getDetails(HttpServletRequest request){
		final Cookie JWT = WebUtils.getCookie(request, "JWT");

		int bidderId = 0;
		String jwt = null;
		if (JWT != null) {
			jwt = JWT.getValue();
			bidderId = jwtTokenUtil.extractBidderId(jwt);
		}
		
		return ResponseEntity.ok(service.getBidder(bidderId));	
	}
	
	@GetMapping("matches")
	public ResponseEntity<?> getMatches(HttpServletRequest request){
		final Cookie JWT = WebUtils.getCookie(request, "JWT");

		int bidderId = 0;
		String jwt = null;
		if (JWT != null) {
			jwt = JWT.getValue();
			bidderId = jwtTokenUtil.extractBidderId(jwt);
		}
		
		return ResponseEntity.ok(service.getMatches());
	}
	
	@GetMapping("match/{matchId}")
	public ResponseEntity<?> getMatchDetails(HttpServletRequest request, @PathVariable int matchId){
		final Cookie JWT = WebUtils.getCookie(request, "JWT");

		int bidderId = 0;
		String jwt = null;
		if (JWT != null) {
			jwt = JWT.getValue();
			bidderId = jwtTokenUtil.extractBidderId(jwt);
		}
		
		return ResponseEntity.ok(service.getMatchDetails(matchId));
	}
	
	@Autowired
	private EmailServiceImpl emailService;
	
	@GetMapping("email")
	public ResponseEntity<String> sendSample(){
		emailService.sendSimpleMessage("gsrikanth1998@gmail.com", "TEST", "Sample from Spring Boot App");
		return new ResponseEntity<String>("Email sent successfully",HttpStatus.OK);
	}
	
	private boolean sendVerification(String to, String text) {
		emailService.sendSimpleMessage(to, "Email verification code", "Please enter the following code to login to the app \n"+text);
		return true;
	}
	
	private boolean sendPassword(String to, String text) {
		emailService.sendSimpleMessage(to, "Password Reset", "Your password has been reset. Please use the following password to login \n"+text);
		return true;
	}
	
	/*
	 * @PostMapping("login") public ResponseEntity<Integer>
	 * validateUser(@RequestBody Map<String,String> credentials){ String username =
	 * credentials.get("userName"); String password = credentials.get("password");
	 * return new ResponseEntity<Integer>(service.login(username,
	 * password),HttpStatus.OK); }
	 */

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtil jwtTokenUtil;

	@Autowired
	private MyUserDetailsService userDetailsService; 

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest, HttpServletResponse response) throws Exception {

		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
					);
		}
		catch (UnauthorizedException e) {
			throw new Exception("Incorrect username or password", e);
		}


		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

		final String jwt = jwtTokenUtil.generateToken(userDetails);
		
		// create a cookie
	    Cookie cookie = new Cookie("JWT", jwt);
	    cookie.setMaxAge(10 * 60 * 60);
	    cookie.setPath("/");
	    cookie.setHttpOnly(true);
	    //add cookie to response
	    response.addCookie(cookie);
	    
		return ResponseEntity.ok("Successfully logged in");
	}
	
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public ResponseEntity<?> removeCookie(HttpServletRequest request, HttpServletResponse response){
		final Cookie JWT = WebUtils.getCookie(request, "JWT");

		int bidderId = 0;
		String jwt = null;
		if (JWT != null) {
			jwt = JWT.getValue();
			bidderId = jwtTokenUtil.extractBidderId(jwt);
		}
		
		// create a cookie
	    Cookie cookie = new Cookie("JWT", jwt);
	    cookie.setMaxAge(0);
	    cookie.setPath("/");
	    cookie.setHttpOnly(true);
	    //add cookie to response
	    response.addCookie(cookie);
	    
		return ResponseEntity.ok("Successfully logged out");
	}

	
	@PostMapping("bid") 
	public ResponseEntity<Bid> bid(HttpServletRequest request, @RequestBody Bid bid){
		final Cookie JWT = WebUtils.getCookie(request, "JWT");

		int bidderId = 0;
		String jwt = null;
		if (JWT != null) {
			jwt = JWT.getValue();
			bidderId = jwtTokenUtil.extractBidderId(jwt);
		}
		bid.setBidderId(bidderId);		
		return new ResponseEntity<Bid>(service.bid(bid),HttpStatus.OK); 
	}

	@GetMapping("leaders")
	public ResponseEntity<List<LeaderBoardListElement>> getLeaderboard(HttpServletRequest request){
		final Cookie JWT = WebUtils.getCookie(request, "JWT");

		int bidderId = 0;
		String jwt = null;
		if (JWT != null) {
			jwt = JWT.getValue();
			bidderId = jwtTokenUtil.extractBidderId(jwt);
		}
		return new ResponseEntity<List<LeaderBoardListElement>>(service.getLeaderBoard(bidderId),HttpStatus.OK);
	}

	@GetMapping("teams")
	public ResponseEntity<List<Team>> getTeamPoints(HttpServletRequest request){
		final Cookie JWT = WebUtils.getCookie(request, "JWT");

		int bidderId = 0;
		String jwt = null;
		if (JWT != null) {
			jwt = JWT.getValue();
			bidderId = jwtTokenUtil.extractBidderId(jwt);
		}
		return new ResponseEntity<List<Team>>(service.getTeamPoints(bidderId),HttpStatus.OK);
	}

	@GetMapping("get_bids")
	public ResponseEntity<List<BidMatch>> getAllBidsPlaced(HttpServletRequest request){
		final Cookie JWT = WebUtils.getCookie(request, "JWT");

		int bidderId = 0;
		String jwt = null;
		if (JWT != null) {
			jwt = JWT.getValue();
			bidderId = jwtTokenUtil.extractBidderId(jwt);
		}
		List<Bid> bids = service.getAllBidsPlaced(bidderId);
		List<BidMatch> bidMatch = new LinkedList();
		for(Bid bid: bids) {
			Match match = (service.getMatchDetails(bid.getMatchId()));
			bidMatch.add(new BidMatch(bid.getBidId(), bid.getBidderId(), bid.getMatchId(), bid.getTeamBidded(), match.getTeamOne(), match.getTeamTwo(), match.getDate(), match.getTime(), match.getStadium(), match.getWinner()));			
		}			
		return new ResponseEntity<List<BidMatch>>(bidMatch,HttpStatus.OK);
	}

	@DeleteMapping("{bidId}")
	public ResponseEntity<String> deleteBid(HttpServletRequest request, @PathVariable int bidId){
		final Cookie JWT = WebUtils.getCookie(request, "JWT");

		int bidderId = 0;
		String jwt = null;
		if (JWT != null) {
			jwt = JWT.getValue();
			bidderId = jwtTokenUtil.extractBidderId(jwt);
		}
		
		service.deleteBid(bidderId, bidId);
		return new ResponseEntity<String>("Bid with Id "+bidId+" has been successfully deleted",HttpStatus.OK);
	}
	
}
