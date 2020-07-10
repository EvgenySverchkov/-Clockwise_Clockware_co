import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {toggleAuth, addCurrentOrderToState} from '../../../store/clientSide/actions';
import LogOutBtn from './LogOutBtn';
import LogInBtn from './LogInBtn';

function Header({isAuth, toggleAuth, currentOrder, addCurrentOrderToState}){
  function logOutHandl(){
    ['user', 'token'].forEach((item) => localStorage.removeItem(item));
    addCurrentOrderToState({...currentOrder, email: ''});
    toggleAuth(false);
  }
  return (
    <header className="masthead mb-auto">
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link to="/client" className="navbar-brand">Clockwise Co.</Link>
        <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbarsExample03" >
          <ul className="navbar-nav mr-auto">
            {isAuth ? <LogOutBtn handler={logOutHandl}/> : <LogInBtn />}
            <li className="nav-item">
              <Link className="nav-link" to="/client/registration">SignUp</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/client">To main</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
function mapStateToProps(state){
  return {
    isAuth: state.client_order_reduser.isAuth,
    currentOrder: state.client_order_reduser.currentOrder,
  }
}
export default connect(mapStateToProps, {toggleAuth, addCurrentOrderToState})(Header);
