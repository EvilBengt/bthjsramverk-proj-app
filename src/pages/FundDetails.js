import React from "react";

import api from "../models/api";
import KeyValue from "../components/KeyValue";

class FundDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fund: {
                name: "",
                long_name: "-",
                value: "-",
                rate: "-",
                variance: "-"
            }
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
                        fund: json.data.fund
                    });
                });
            }
        });
    }

    render() {
        return (
            <main>
                <h2 className="content-title">{ this.state.fund.long_name }</h2>
                <KeyValue
                    label="Värde"
                    value={ roundToCents(this.state.fund.value) + " pengar/andel" }/>
            </main>
        );
    }
}

function roundToCents(value) {
    return Math.round(value * 100) / 100;
}

export default FundDetails;
