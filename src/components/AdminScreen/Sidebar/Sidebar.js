import React from 'react';
import {Link} from "react-router-dom";

function Sidebar(props){
  return (
    <div className="sidebar">
      <ul style={{listStyle: 'none'}}>
        <li>
          <Link to="/admin/clientsList">
              Clients
          </Link>
        </li>
        <li>
          <Link to="/admin/mastersList">
              Masters
          </Link><br/>
          <Link to="/admin/addMasterForm">
              <button>Add master</button>
          </Link>
        </li>
        <li>
          <Link to="/admin/townsList">
            Towns
          </Link><br/>
          <Link to="/admin/addTownForms">
            <button>Add town</button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
