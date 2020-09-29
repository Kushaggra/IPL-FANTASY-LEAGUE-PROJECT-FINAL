import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './layout/NavBarLR';

const TeamPoints = () => {
    axios.defaults.withCredentials = true;
    const history = useHistory();
    const [Teams, setTeams] = useState([]);
    const [Bidder, setBidder] = useState({
        userName: '',
        password: '',
        name: '',
        email: '',
        phoneNo: '',
        isEnabled: false,
    });
    const {userName, password, name, email, phoneNo, isEnabled} = Bidder;

    const getTeams = async () => {
        const response = await axios.get('http://localhost:8100/bidder/teams');
        console.log(response.data);
        setTeams(response.data);
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
        console.log("EFFECT")
        getBidderDetails();
        getTeams();
    }, []);

    return (
        <div>
            <NavigationBar />
            {Status}
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Team Name</th>
                        <th scope="col">Points</th>
                        <th scope="col">Ranking</th>
                    </tr>
                </thead>
                <tbody>
                    {Teams.map((team, index) => (
                        <tr key={index+1}>
                            <td>{team.teamName}</td>
                            <td>{team.points}</td>
                            <td>{team.ranking}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
};

export default TeamPoints;
