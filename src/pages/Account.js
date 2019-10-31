import React from "react";
import { Link } from "react-router-dom";

import KeyValue from "../components/KeyValue";
import api from "../models/api";
import auth from "../models/auth";

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            funds: []
        };
    }

    componentDidMount() {
        api.get("/account", undefined, {
            "x-access-token": auth.token.get()
        })(res => {
            if (res.ok) {
                res.json().then(json => {
                    this.setState(json.data);
                })
            }
        });
    }

    render() {
        return (
            <main>
                <h2 className="content-title">Mina sidor</h2>
                <KeyValue
                    label="Pengar"
                    value={ this.state.balance }/>
                <div className="tab-container">
                    <Link className="tab button"
                        to="/stoppa-in-pengar">
                            Stoppa in mer pengar
                    </Link>
                </div>
                <h3 className="content-title">Mina fonder</h3>
                <ul className="tab-container">
                    { this.state.funds.map(fund =>
                        <li key={ fund.name } className="big-li">
                            <Link to={ "fond/" + fund.name } className="tab">
                                { fund.long_name }
                            </Link>
                            <KeyValue
                                label="Andelar"
                                value={ fund.amount }/>
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

export default Account;
