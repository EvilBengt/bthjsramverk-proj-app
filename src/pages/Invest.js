import React from "react";
import { Redirect } from "react-router-dom";

import KeyValue from "../components/KeyValue";
import auth from "../models/auth";
import account from "../models/account";

class Invest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.match.params.name,
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
            return <Redirect to={ "/fond/" + this.state.name }/>;
        }
        return (
            <main>
                <h2 className="content-title">Investera</h2>
                <KeyValue
                        label="Tårtur-ID"
                        value={ this.state.name }/>
                <form className="form"
                    onSubmit={ e => {
                        e.preventDefault();
                        this.submit();
                    } }
                >
                    <input className="input"
                        type="number"
                        step="any"
                        placeholder="Antal andelar"
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
                            Köp
                        </button>
                    </div>
                    <p className="paragraph">
                        Om inget händer* kan det bero på att du har för lite pengar
                        på ditt konto**. Tänk på att Tårturs fonder kan stiga markant
                        i värde på bara en liten stund!
                    </p>
                    <p className="paragraph paragraph-tiny">
                        *Vi på Tårtur tror inte på felmeddelanden då de kan ge användaren
                        intrycket att det är fel på våran app, när det i själva verket är
                        användaren det är fel- Eller, som gör fel, menar jag...<br/>
                        **För att stoppa in mer pengar på ditt konto, gå till "Mina sidor"
                        och klicka på knappen "Stoppa in mer pengar".
                    </p>
                </form>
            </main>
        );
    }

    submit() {
        account.invest(this.state.name, this.state.amount, allWentWell => {
            this.stateWith({
                done: allWentWell
            });
        });
    }
}

export default Invest;
