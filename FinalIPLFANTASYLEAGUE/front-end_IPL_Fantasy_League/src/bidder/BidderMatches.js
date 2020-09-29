import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './layout/NavBarLR';

const BidderMatches = () => {
    axios.defaults.withCredentials = true;
    const history = useHistory();
    const [matches, setMatch] = useState([]);
    const [Bidder, setBidder] = useState({
        userName: '',
        password: '',
        name: '',
        email: '',
        phoneNo: '',
        isEnabled: false,
    });
    const {userName, password, name, email, phoneNo, isEnabled} = Bidder;

    const getMatches = async () => {
        await axios.get('http://localhost:8100/bidder/matches')
            .then((response) => {
                console.log(response.data);
                setMatch(response.data);
            });
    };

    const [Status, setStatus] = useState('');

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
                }
            })
            .catch((error) => {
                console.log(error.toJSON());
                history.push('/bidder/login');
            });
    };

    useEffect(() => {
        getBidderDetails();
        getMatches();
    }, []);

    const [Bid,setBid] = useState({
        matchId: 0,
        teamBidded: '',
    });

    return (
        <div>
            <NavigationBar />
            {Status}
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Team One</th>
                        <th scope="col">Team Two</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>

                        {(Status === '') && <th scope="col" className="align-items-center">Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {matches.map((match, index) => (
                        <tr key={match.matchId}>
                            <th scope="row">{index + 1}</th>
                            <td>{match.teamOne}</td>
                            <td>{match.teamTwo}</td>
                            <td>{match.date.split('-').reverse().join('/')}</td>
                            <td>{match.time}</td>
                            {(Status === '') && (
                                ((Date.now() < Date.parse(`${match.date}T${match.time}`)) && (
                                    <td>

                                        <Link to={`/bidder/match/${match.matchId}`}>Bid</Link>

                                    </td>
                                )
                                )
                            )}

                            {(Status === '') && (
                                ((Date.now() > Date.parse(`${match.date}T${match.time}`)) && (
                                    <td>

                                        Match started

                                    </td>
                                )
                                )
                            )}

                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
};

export default BidderMatches;
