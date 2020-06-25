import React from 'react';
import {Link, useLocation} from "react-router-dom";

export default function LinkToEditForm(props){
  let location = useLocation();

  function chooseRoute(currentPath){
    let arr = currentPath.split('/');
    switch(arr[arr.length-1]){
      case "clientsList":
        return "/admin/editClient/";
      case "mastersList":
        return "/admin/editMaster/";
      case "townsList":
        return "/admin/editTown/";
      default:
        return currentPath;
    }
  }
  return (
    <Link to={chooseRoute(location.pathname) + props.id}
          className="dropdown-item">Edit</Link>
  );
}
