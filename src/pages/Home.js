import React from "react";

function Home() {
    return (
        <main>
            <h2 className="content-title">Välkommen till Tårtur!</h2>
            <p className="paragraph">
                Här kan du investera i bakverk av alla sorter.*
                Stoppa in lite pengar i valfria fonder så har
                du <strong>stor chans att gå med vinst!</strong>**
            </p>
            <p className="paragraph paragraph-tiny">
                *Gäller - utan några som helst undantag - endast tårtor.<br/>
                **Bedswank, Bedswank Tårtur och dess anställda avsäger
                sig ansvar för eventuella förluster orsakade av
                tappade tårtor, oätliga tårtor eller påhittade tårtor.
                För eventuella klagomål, kontakta de enskilda
                tårt-tapperierna, bakoduglingarna respektive påhittade
                bagerierna.
            </p>
        </main>
    );
}

export default Home;
