import React from "react";
import { Link } from "react-router-dom";

function Login() {
    return (
        <main>
            <h2 className="content-title">Logga in</h2>
            <form className="form"
                onSubmit={ e => {
                    e.preventDefault();
                    console.log("log in");
                } }
            >
                <input className="input"
                    type="email"
                    placeholder="E-post"
                    required/>
                <input className="input"
                    type="password"
                    placeholder="Lösenord"
                    required/>
                <div className="tab-container">
                    <button className="tab button submit"
                        type="submit">
                        Logga in
                    </button>
                </div>
            </form>
            <Link className="content-title" to="/skapa-konto">
                Inget konto?
            </Link>
        </main>
    );
}

export default Login;
