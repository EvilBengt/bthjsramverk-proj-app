import React from "react";
import { Link, Redirect } from "react-router-dom";

import auth from "../models/auth";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loggedIn: false
        };
        auth.token.subscribe(hasToken => {
            if (hasToken) {
                this.stateWith({
                    loggedIn: true
                });
            }
        });
    }

    stateWith(updates) {
        this.setState(Object.assign(this.state, updates));
    }

    render() {
        if (this.state.loggedIn) {
            return <Redirect to="/mina-sidor"/>
        }
        return (
            <main>
                <h2 className="content-title">Skapa konto</h2>
                <form className="form"
                    onSubmit={ e => {
                        e.preventDefault();
                        this.submit();
                    } }
                >
                    <input className="input"
                        type="email"
                        placeholder="E-post"
                        required
                        onChange={ e => {
                            this.stateWith({
                                email: e.target.value
                            });
                        } }
                    />
                    <input className="input"
                        type="password"
                        placeholder="Lösenord"
                        required
                        onChange={ e => {
                            this.stateWith({
                                password: e.target.value
                            });
                        } }
                    />
                    <div className="tab-container">
                        <button className="tab button submit"
                            type="submit">
                            Skapa
                        </button>
                    </div>
                </form>
                <Link className="content-title" to="/logga-in">
                    Logga in?
                </Link>
            </main>
        );
    }

    submit() {
        auth.register(
            this.state.email,
            this.state.password
        );
    }
}

export default Register;
