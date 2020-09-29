import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './layout/NavBarLR';

const Bid = () => {
    axios.defaults.withCredentials = true;
    const { id } = useParams();

    const history = useHistory();
    const [match, setMatch] = useState({
        matchId: '',
        teamOne: '',
        teamTwo: '',
        date: '',
        stadium: '',
        time: '',
    });
    const [Bidder, setBidder] = useState({
        userName: '',
        password: '',
        name: '',
        email: '',
        phoneNo: '',
        isEnabled: false,
    });
    const {userName, password, name, email, phoneNo, isEnabled} = Bidder;

    const getMatch = async () => {
        const response = await axios.get(`http://localhost:8100/bidder/match/${id}`);
        console.log(response.data);
        setMatch(() => response.data);
        setBid({...Bid, teamBidded: response.data.teamOne, matchId: response.data.matchId});
        if (Date.now() > Date.parse(response.data.date+"T"+response.data.time)) {
            setMatchStatus(false);
        }
    };

    const [Status, setStatus] = useState('');
    const [SubmitStatus, setSubmitStatus] = useState(true);
    const [BidStatus, setBidStatus] = useState('');
    const [MatchStatus,setMatchStatus] = useState(true);
    const getBidderDetails = async () => {
        await axios.get('http://localhost:8100/bidder/details')
            .then((response) => {
                setBidder(response.data);
                if (response.data.isEnabled === false) {
                    setStatus(
                        <div>
                            This account is not activated. Please click the following link to activate.
                            <Link to="/bidder/verify">Verify</Link>
                        </div>);
                    setSubmitStatus(false);
                }
            })
            .catch((error) => {
                console.log(error.toJSON());
                history.push('/bidder/login');
            });
    };

    useEffect(() => {
        getBidderDetails();
        getMatch();
    }, [BidStatus]);

    const [Bid,setBid] = useState({
        matchId: 0,
        teamBidded: '',
    });

    const handleChange = (event) => {
        setBid({ ...Bid, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8100/bidder/bid", Bid)
            .then((response) => {
                setBidStatus(`Bid successfully placed on ${response.data.teamBidded}`)
                console.log(response);
            })
            .catch((error) => {
                if (error.response.status===410) {
                    setBidStatus("Match has already started.")
                    setSubmitStatus(() => false);
                }
            })
        //setBid(() => ({ matchId: match.matchId, teamBidded: event.target.value }));
        console.log(Bid);
    };
    if(MatchStatus) {
        return (
            <div>
                <NavigationBar />
                {Status}
                <h2>Match details</h2><br />
                {match.teamOne} vs {match.teamTwo}<br />
                On {match.date}T{match.time} at {match.stadium}<br />

                <form onSubmit={handleSubmit}>
                    <label for="teamBidded">Choose a team:</label>
                    <select name="teamBidded" id="teamBidded" onChange={handleChange}>
                        <option value={match.teamOne}>{match.teamOne}</option>
                        <option value={match.teamTwo}>{match.teamTwo}</option>
                    </select>
                    <button type="submit" className="btn btn-primary" disabled={(SubmitStatus) ? '':"disabled"}>Submit</button>
                    <br />
                    {BidStatus}
                </form>
            </div>
        );
    }
    else {
        return (
            <div>
                <NavigationBar />
                {Status}
                <h2>Match details</h2><br />
                {match.teamOne} vs {match.teamTwo}<br />
                On {match.date}T{match.time} at {match.stadium}<br />
                
                Match has already started
            </div>
        )
    }
};

export default Bid;
