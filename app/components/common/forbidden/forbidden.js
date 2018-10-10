import React from "react";
import {Link} from "react-router-dom";

import "./forbidden.scss";

var Forbidden = function () {
    return (
        <div className="forbidden">
            <div className="title">
                You don't have permissions to access this page
			</div>

            <img src="/img/icons/warning-icon.png" />

            <div className="home-link">
                Go back to the <Link to="/">home page</Link>
            </div>
        </div>
    );
};

export default Forbidden;