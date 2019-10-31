import React from "react";

function KeyValue(props) {
    return (
        <div className="kv">
            <span className="kv-key">{ props.label } </span>
            <span className="kv-value">{ props.value }</span>
        </div>
    );
}

export default KeyValue;
