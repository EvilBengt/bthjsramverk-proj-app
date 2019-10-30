import React from "react";
import { Link } from "react-router-dom";

function Funds() {
    return (
        <main>
            <h2 className="content-title">Alla fonder</h2>
            <ul className="tab-container">
                <li>
                    <Link to="fond/ptf" className="tab">
                        Princesstårte-fonden
                    </Link>
                </li>
                <li>
                    <Link to="fond/ats" className="tab">
                        Alletårtspar
                    </Link>
                </li>
                <li>
                    <Link to="fond/klp" className="tab">
                        The Key Lime Pie Foundation
                    </Link>
                </li>
                <li>
                    <Link to="fond/kti" className="tab">
                        Kapitårtinvest
                    </Link>
                </li>
            </ul>
        </main>
    );
}

export default Funds;
