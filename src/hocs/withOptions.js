import React from 'react';
import {Link} from "react-router-dom";

export default (Component, action)=>{
  return class WithDeleteBtn extends React.Component{
    constructor(props){
      super(props);
      this.deleteHandler = this.deleteHandler.bind(this);
    }
    deleteHandler(){
      action(this.props.infoObj.id);
    }
    chooseRoute(name){
      switch(name){
        case "MasterItem":
          return "/admin/editMaster/";
        case "TownItem":
          return "/admin/editTowns/";
      }
    }
    render(){
      return (
        <>
          <Component {...this.props}/>
          <td>
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Options
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <button onClick={this.deleteHandler} className="dropdown-item">Delete</button>
                  <Link to={this.chooseRoute(Component.displayName) + this.props.infoObj.id}
                        className="dropdown-item">Edit</Link>
                </div>
            </div>
          </td>
        </>
      );
    }
  }
}
