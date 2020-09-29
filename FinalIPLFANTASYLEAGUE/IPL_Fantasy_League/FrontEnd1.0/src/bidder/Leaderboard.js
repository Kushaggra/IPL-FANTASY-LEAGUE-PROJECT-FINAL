import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './layout/NavBarLR';

const Leaderboard = () => {
    axios.defaults.withCredentials = true;
    const history = useHistory();
    const [Leaders, setLeaders] = useState([]);
    const [Bidder, setBidder] = useState({
        userName: '',
        password: '',
        name: '',
        email: '',
        phoneNo: '',
        isEnabled: false,
    });
    const {userName, password, name, email, phoneNo, isEnabled} = Bidder;

    const getLeaders = async () => {
        const response = await axios.get('http://localhost:8100/bidder/leaders');
        console.log(response.data);
        setLeaders(response.data);
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
        getLeaders();
    }, []);

    return (
        <div>
            <NavigationBar />
            {Status}
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Position</th>
                        <th scope="col">Name</th>
                        <th scope="col">Points</th>
                    </tr>
                </thead>
                <tbody>
                    {Leaders.map((leader, index) => (
                        <tr key={index}>
                            <td>{leader.position}</td>
                            <td>{leader.name}</td>
                            <td>{leader.points}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
