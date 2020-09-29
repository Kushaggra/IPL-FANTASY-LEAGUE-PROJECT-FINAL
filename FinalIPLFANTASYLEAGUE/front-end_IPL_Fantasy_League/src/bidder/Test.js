import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import NavigationBar from './layout/NavBarLR';
const { Component } = require("react");

class ParentComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {id: 1, date: "2014-04-18", total: 121.0, status: "Shipped", name: "A", points: 5, percent: 50},
                {id: 2, date: "2014-04-21", total: 121.0, status: "Not Shipped", name: "B", points: 10, percent: 60},
                {id: 3, date: "2014-08-09", total: 121.0, status: "Not Shipped", name: "C", points: 15, percent: 70},
                {id: 4, date: "2014-04-24", total: 121.0, status: "Shipped", name: "D", points: 20, percent: 80},
                {id: 5, date: "2014-04-26", total: 121.0, status: "Shipped", name: "E", points: 25, percent: 90},
            ],
            Bid: { bidId:0, matchId:0, teamBidded:'' },
            Bids: [],
            Bidder: [],
            expandedRows: [],
            status: 0,
        };

        this.getBids();
        //this.getBidderDetails();

        this.handleChange = this.handleChange.bind(this);
    }

    async getBids() {
        console.log("GET BIDS")
        await axios.get('http://localhost:8100/bidder/get_bids')
            .then((response) => {
                this.setState({ Bids: response.data });
                console.log(this.state.Bids);
            });
    };

    async getBidderDetails() {
        console.log("GETTING BIDDER DETAILS");
        await axios.get('http://localhost:8100/bidder/details')
            .then((response) => {
                console.log("SUCCESS");
                this.setState({ Bidder: response.data });
                console.log(this.state.Bidder);
                console.log(this.state.Bidder.isEnabled)
                ((response.data.isEnabled) && this.props.history.push("/bidder"));
            })
            .catch((error) => {
                console.log("FAIL");
                console.log(error.response);
                this.props.history.push('/bidder/login');
            });
            
    }

    handleCancel(item) {
        console.log(item);
        const value = window.confirm(`Do you really want to cancel the bid placed on ${item.teamBidded} for the match between ${item.teamOne} and ${item.teamTwo}`);
        console.log(value);
        if (value === true) {
            console.log("Removing")
            axios.delete(`http://localhost:8100/bidder/${item.bidId}`)
                .then((response) => {
                    console.log(response.data);
                    this.setState((state) => ({
                        Bids: state.Bids.filter((bids) => bids !== item),
                    }));
                });
        }
    }

    handleEdit(bid) {
        console.log(bid);
        this.setState((state) => ({
            Bid: { ...state.Bid, matchId: bid.matchId, bidId: bid.bidId },
        }));
        console.log(this.state.Bids)
        //this.setState({Bid:{matchId: bid.matchId}});
        axios.post("http://localhost:8100/bidder/bid", this.state.Bid)
            .then((response) => {
                console.log(`Bid successfully placed on ${response.data.teamBidded}`);
                alert(`Bid successfully placed on ${response.data.teamBidded}`);
            })
            .catch((error) => {
                if (error.response.status===410) {
                    console.log("Match has already started.");
                    alert("Match has already started. Please refersh the page for latest data.")
                    this.props.history.push("/bidder/test");
                }
            });
    };

    handleChange(event) {
        this.setState({status: 1});
        console.log(event.target.value);
        const teamBiddedValue = event.target.value;
        this.setState((state) => ({
            Bid: { ...state.Bid, teamBidded: teamBiddedValue },
        }));
        console.log(this.state.Bid);
    }



    handleRowClick(item) {
        this.setState({status: 0})
        const currentExpandedRows = this.state.expandedRows;
        const isRowCurrentlyExpanded = currentExpandedRows.includes(item.bidId);
        const newExpandedRows = isRowCurrentlyExpanded ? [] : [item.bidId];
        this.setState((state) => ({
            Bid: { ...state.Bid, teamBidded:item.teamBidded },
        }));
        /* const newExpandedRows = isRowCurrentlyExpanded ?
            currentExpandedRows.filter(id => id !== rowId) :
            currentExpandedRows.concat(rowId);*/

        this.setState({ expandedRows: newExpandedRows });
    }

    renderItem(item) {
        const clickCallback = () => this.handleRowClick(item);
        const itemRows = [
            <tr onClick={clickCallback} key={"row-data-" + item.bidId}>
                <td>{item.teamOne}</td>
                <td>{item.teamTwo}</td>
                <td>{item.stadium}</td>
                <td>{item.date.split('-').reverse().join('/')}</td>
                <td>{item.time}</td>
            </tr>,
        ];

        if(this.state.expandedRows.includes(item.bidId)) {
            if((Date.now() < Date.parse(`${item.date}T${item.time}`))) {
                itemRows.push(
                    <tr key={"row-expanded-" + item.bidId}>
                        <td colSpan="3">Selected team: <nbsp/><nbsp/>
                            <select name="teamBidded" id="teamBidded" onChange={this.handleChange}>
                                <option value={item.teamOne} selected={(item.teamBidded===item.teamOne) ? "selected":""}>{item.teamOne}</option>
                                <option value={item.teamTwo} selected={(item.teamBidded===item.teamTwo) ? "selected":""}>{item.teamTwo}</option>
                            </select>
                        </td>
                        <td><button type="button" className="btn btn-primary" disabled={(this.state.status===1)? '':"disabled"} onClick={() => this.handleEdit(item)}>Edit</button></td>
                        <td><button type="button" className="btn btn-primary" onClick={() => this.handleCancel(item)}>Cancel</button></td>
                    </tr>,
                );
            }
            else if(item.winner === 'NA'){
                itemRows.push(
                    <tr key={"row-expanded-" + item.bidId}>
                        <td colSpan="5">You have selected {item.teamBidded}. Match is currently being played.</td>
                    </tr>,
                );
            }
            else{
                itemRows.push(
                    <tr key={"row-expanded-" + item.bidId}>
                        <td colSpan="5">You have selected {item.teamBidded}. Winner is {item.winner}.</td>
                    </tr>,
                );
            }
        }

        return itemRows;
    }

    render() {
        let allItemRows = [];

        this.state.Bids.forEach((item) => {
            const perItemRows = this.renderItem(item);
            allItemRows = allItemRows.concat(perItemRows);
        });

        return (
            <div>
                <NavigationBar />
                Please click a specific match for details on bid.
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <td>Team A</td>
                            <td>Team B</td>
                            <td>Stadium</td>
                            <td>Date</td>
                            <td>Time</td>
                        </tr>
                    </thead>
                    <tbody>
                        {allItemRows}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ParentComponent;