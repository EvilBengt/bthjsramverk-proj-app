import React from "react";
import { Redirect } from "react-router-dom";

import auth from "../models/auth";
import account from "../models/account";

class Deposit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            done: false
        };
    }

    stateWith(updates) {
        this.setState(Object.assign(this.state, updates));
    }

    render() {
        if (!auth.token.isSet()) {
            return <Redirect to="/logga-in"/>;
        }
        if (this.state.done) {
            return <Redirect to="mina-sidor"/>;
        }
        return (
            <main>
                <h2 className="content-title">Stoppa in { this.state.amount < 0 ? "mindre" : "mer" } pengar</h2>
                <form className="form"
                    onSubmit={ e => {
                        e.preventDefault();
                        this.submit();
                    } }
                >
                    <input className="input"
                        type="number"
                        step="any"
                        placeholder="Antal pengar"
                        required
                        onChange={ e => {
                            this.stateWith({
                                amount: e.target.value
                            });
                        } }
                    />
                    <div className="tab-container">
                        <button className="tab button submit"
                            type="submit">
                            Stoppa in { this.state.amount < 0 ? "mindre" : "mer" } pengar
                        </button>
                    </div>
                    <p className="paragraph">
                        Om inget händer* kan det bero på att du klickar på fel sätt**.
                    </p>
                    <p className="paragraph paragraph-tiny">
                        *Vi på Tårtur tror inte på felmeddelanden då de kan ge användaren
                        intrycket att det är fel på våran app, när det i själva verket är
                        användaren det är fel- Eller, som gör fel, menar jag...<br/>
                        **Bedswank Tårtur kan inte garantera att tekniken som används vid
                        knapptryck har någon direkt koppling till korrekt eller
                        inkorrekt beteende.
                    </p>
                </form>
            </main>
        );
    }

    submit() {
        account.deposit(this.state.amount, allWentWell => {
            this.stateWith({
                done: allWentWell
            });
        });
    }
}

export default Deposit;
