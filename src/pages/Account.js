import React from "react";
import { Link, Redirect } from "react-router-dom";

import KeyValue from "../components/KeyValue";
import api from "../models/api";
import auth from "../models/auth";
import funds from "../models/funds";

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            funds: [],
            loggedIn: auth.token.isSet()
        };
    }

    stateWith(updates) {
        this.setState(Object.assign(this.state, updates));
    }

    componentDidMount() {
        api.get("/account", undefined, {
            "x-access-token": auth.token.get()
        })(res => {
            if (res.ok) {
                res.json().then(json => {
                    this.stateWith({
                        balance: json.data.balance,
                        funds: json.data.funds
                    });
                })
            }
        });

        funds.subscribe(funds => {
            this.stateWith({
                funds: this.state.funds.map(fund => {
                    return {
                        name: fund.name,
                        long_name: fund.long_name,
                        amount: fund.amount,
                        value: funds.find(i => i.name === fund.name).value
                    }
                })
            })
        });
    }

    render() {
        if (!this.state.loggedIn) {
            return <Redirect to="logga-in"/>
        }
        return (
            <main>
                <h2 className="content-title">Mina sidor</h2>
                <KeyValue
                    label="Pengar"
                    value={ roundToCents(this.state.balance) }/>
                <KeyValue
                    label="Värde i fonder"
                    value={ roundToCents(this.state.funds.reduce((total, fund) =>
                        total + fund.value * fund.amount, 0)) }/>
                <div className="tab-container">
                    <Link className="tab button"
                        to="/stoppa-in-mer-pengar">
                            Stoppa in mer pengar
                    </Link>
                </div>
                <h3 className="content-title">Mina fonder</h3>
                <ul className="tab-container">
                    { this.state.funds.map(fund =>
                        <li key={ fund.name } className="big-li">
                            <Link to={ "fond/" + fund.name } className="tab">
                                { fund.long_name + " (" + fund.name + ")" }
                            </Link>
                            <KeyValue
                                label="Andelar"
                                value={ fund.amount }/>
                            <KeyValue
                                label="Värde"
                                value={ roundToCents(fund.value) + "/andel" }/>
                            <KeyValue
                                label="Totalt värde"
                                value={ roundToCents(fund.amount * fund.value) }/>
                            <Link to={ "salj/" + fund.name } className="tab button">
                                Sälj
                            </Link>
                        </li>
                    ) }
                </ul>
            </main>
        );
    }
}

function roundToCents(value) {
    return Math.round(value * 100) / 100;
}

export default Account;
