import * as React from "react";
import * as ReactDOM from "react-dom";

import "../scss/styles.scss";

import Messenger from "./Messenger";

let App = React.createClass({
    render(): any {
        return (
            <div className="messenger__cont">
                <Messenger />

            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById("app"));