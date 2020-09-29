import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const BidsPlaced = () => {
    axios.defaults.withCredentials = true;
    const history = useHistory();

    let [count, setCount] = useState(0);

    const [Bids, setBids] = useState([{
        bidId: 0,
        bidderId: 0,
        matchId: 0,
        teamBidded: '',
        teamOne: '',
        teamTwo: '',
        date: '',
        time: '',
        stadium: '',
        winner: '',
    }]);

    const getBids = async () => {
        await axios.get('http://localhost:8100/bidder/get_bids')
            .then((response) => {
                setBids(response.data);
                console.log(response.data);
                setCount(1);
            });
    };

    useEffect(() => {
        getBids();
    }, []);

    const [expandedRows, setExpandedRows] = useState([]);

    const handleRowClick = (rowId) => {
        const currentExpandedRows = expandedRows;
        const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);
        const newExpandedRows = isRowCurrentlyExpanded ? currentExpandedRows.filter(bidId => bidId !== rowId) : currentExpandedRows.concat(rowId);
        setExpandedRows(newExpandedRows);
        setCount((count) => (count+1))
    };

    const renderItem = (item) => {
        console.log("RENDER ITEM");
        const clickCallback = () => handleRowClick(item.bidId);
        let itemRows = (
            <tr onClick={clickCallback} key={"row-data-" + item.bidId}>
                <td>{item.teamOne}</td>
                <td>{item.teamTwo}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.stadium}</td>
                <td>{item.winner}</td>
            </tr>
        );

        if (expandedRows.includes(item.id)) {
            console.log("INCLUDES")
            itemRows.push(
                <tr key={"row-expanded-" + item.bidId}>
                    <td>{item.teamBidded}</td>
                    <td>{item.points}</td>
                    <td>{item.percent}</td>
                </tr>,
            );
        }
        return itemRows;
    };

    let [allItemRows, setAllItemRows] = useState([]);

    useEffect(() => {
        Bids.forEach((item )=> {
            if(count >0 ){
                const perItemRows = renderItem(item);
            //setAllItemRows({...allItemRows,perItemRows});
            allItemRows = allItemRows.concat(perItemRows);
            console.log(allItemRows);
        }
        console.log("EFFECT")
            })
            
    }, [count],);

    return (
        <div>
        
        TEST
        
        
        <table className="table table-hover">
        {(count===0) && allItemRows}
        </table>
        </div>
    );
    {/*
            View all bids page
            <table class="table table-borderless table-dark">
                <thead>
                    <tr>
                    <th scope="col">bidId</th>
                    <th scope="col">bidderId</th>
                    <th scope="col">matchId</th>
                    <th scope="col">teamBidded</th>
                    <th>stadium</th>
                    </tr>
                </thead>
                <tbody>
                    {Bids && (Bids.map(({bidId, bidderId, matchId, teamBidded, stadium}) => {
                        return (<tr>
                            <td>{bidId}</td>
                            <td>{bidderId}</td>
                            <td>{matchId}</td>
                            <td>{teamBidded}</td>
                            <td>{stadium}</td>
                        </tr>)
                    }))}
                </tbody>
                </table> */}
};

export default BidsPlaced;
