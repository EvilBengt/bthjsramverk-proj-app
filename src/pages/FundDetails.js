import React from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import RTChart from "react-rt-chart";
import "../css/c3.css";

import api from "../models/api";
import KeyValue from "../components/KeyValue";

const devSocketUrl = "http://192.168.2.163:8400";
const prodSocketUrl = "https://proj-socket.jsramverk.evilbengt.me";
let socketUrl;

if (window.location.origin.includes("localhost")) {
    socketUrl = devSocketUrl;
} else {
    socketUrl = prodSocketUrl;
}

class FundDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            long_name: "",
            value: 0
        };
    }

    stateWith(updates) {
        this.setState(Object.assign(this.state, updates));
    }

    componentDidMount() {
        api.get("/funds/fund/" + this.props.match.params.name)(res => {
            if (res.ok) {
                res.json().then(json => {
                    this.stateWith({
                        name: json.data.fund.name,
                        long_name: json.data.fund.long_name,
                        value: roundToCents(json.data.fund.value)
                    });
                });
            }
        });

        console.log("Socket stuff temporarily disabled!!", io ? "" : "", socketUrl ? "" : "");

        // const socket = io(socketUrl);

        // socket.on("connect", () => {
        //     socket.on("fundUpdate", (funds) => {

        //         const relevantFund = funds.find(fund => fund.name === this.state.name);

        //         this.stateWith({
        //             value: roundToCents(relevantFund.value)
        //         });
        //     });
        // });
    }

    render() {
        const data = {
            date: new Date(),
            "Pengar/andel": this.state.value
        };
        const chart = {
            size: {
                height: 250
            }
        };
        const axis = {
            y: {
                tick: {
                    format: roundToCents
                }
            }
        };

        return (
            <main>
                <h2 className="content-title">{ this.state.long_name }</h2>
                <KeyValue
                    label="Tårtur-ID"
                    value={ this.state.name }/>
                <KeyValue
                    label="Värde"
                    value={ this.state.value + " pengar/andel" }/>
                <div className="tab-container">
                    <Link className="button tab"
                        to={ "/investera/" + this.state.name }>
                            Investera
                    </Link>
                </div>
                <div className="chart-container">
                <RTChart
                    fields={ ["Pengar/andel"] }
                    data={ data }
                    chart={ chart }
                    axis={ axis }/>
                </div>
            </main>
        );
    }
}

function roundToCents(value) {
    return Math.round(value * 100) / 100;
}

export default FundDetails;
