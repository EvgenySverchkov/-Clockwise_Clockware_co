import React from "react";
import { Link } from "react-router-dom";

import MasterCard from "./MasterCard";
import ComeBackBtn from "./ComeBackBtn";
import SubmitBtn from "./SubmitBtn";

function FreeMastersList({submitHandler, isLoad, suitableMasters, backTo}){
  if (suitableMasters.length === 0) {
    return (
    <>
      <div className="text-left display-4">
        List is empty...
      </div>
      <Link to={backTo} className="btn btn-primary mt-5">
        Сome back
      </Link>
    </>
    );
  }
  return (
    <form onSubmit={submitHandler}>
      <div className="row">
        {suitableMasters.map((item) => {
          return <MasterCard id = {item.id} name={item.name} rating={item.rating} towns={item.towns} key={item.id}/>;
        })}
      </div>
      <ComeBackBtn backTo={backTo}/>
      <SubmitBtn isLoad={isLoad}/>
    </form>
    );
}

export default FreeMastersList;