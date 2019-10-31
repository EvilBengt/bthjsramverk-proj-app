import React from "react";
import { Link } from "react-router-dom";

import api from "../models/api";

class Funds extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            funds: []
        };
    }

    componentDidMount() {
        api.get("/funds/all")(res => {
            if (res.ok) {
                res.json().then(json => {
                    this.setState({
                        funds: json.data.funds
                    })
                })
            }
        });
    }

    render() {
        return (
            <main>
                <h2 className="content-title">Alla fonder</h2>
                <ul className="tab-container">
                    { this.state.funds.map(fund =>
                        <Fund
                            key={ fund.name }
                            name={ fund.name }
                            longName={ fund.long_name }/>
                    ) }
                </ul>
            </main>
        );
    }
}

function Fund(props) {
    return (
        <li>
            <Link to={ "fond/" + props.name } className="tab">
                { props.longName }
            </Link>
        </li>
    );
}

export default Funds;
