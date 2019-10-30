import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Funds from "./pages/Funds";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: undefined
        };
    }

    render() {
        return (
            <Router>
                <header>
                    <h1 className="header">Bedswank Tårtur</h1>
                </header>
                <nav>
                    <ul className="navigation">
                        <li>
                            <Link className="navigation-link" to="/">Hem</Link>
                        </li>
                        <li>
                            <Link className="navigation-link" to="/fonder">Fonder</Link>
                        </li>
                        <li>
                            <Link className="navigation-link"
                                to={ this.state.token ? "/mina-sidor" : "logga-in" }>
                                Mina sidor
                            </Link>
                        </li>
                    </ul>
                </nav>
                <Route exact path="/" component={ Home } />
                <Route path="/fonder" component={ Funds } />
                <Route path="/mina-sidor" component={ Account } />
                <Route path="/logga-in" component={ Login } />
                <Route path="/skapa-konto" component={ Register } />
            </Router>
        );
    }
}

export default App;
