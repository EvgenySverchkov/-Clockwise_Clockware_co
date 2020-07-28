import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {toogleAuth} from "../../../store/adminPanel/actions";

const LogOutBtn = ({toogleAuth}) => {
    function handler(){
        sessionStorage.removeItem("token");
        toogleAuth(false);
    }
    return (
        <div className="mr-1">
        <Link
            to="/admin"
            onClick={handler}
            className="btn btn-secondary"
            aria-haspopup="true"
            aria-expanded="false"
        >
            LogOut
        </Link>
    </div>
)};

export default connect(null, {toogleAuth})(LogOutBtn);