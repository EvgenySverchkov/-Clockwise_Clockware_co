import React from "react";
import { Link } from "react-router-dom";

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
          return (
            <div className="col-sm-4 mb-2 col-sm-6 col-lg-4" key={item.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">Rating: {item.rating}</p>
                  <p className="card-text">Towns: {item.towns}</p>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="chooseMaster"
                      id={item.id}
                      value={item.id}
                    />
                    <label className="form-check-label" htmlFor={item.id}>
                      Choose
                    </label>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="form-group float-left mt-3">
        <Link to={backTo} className="btn btn-primary">
          Сome back
        </Link>
      </div>
      <div className="form-group float-right mt-3">
        <input
          type="submit"
          value={isLoad ? "Loading..." : "Book now"}
          className="btn btn-primary"
        />
      </div>
    </form>
    );
}

export default FreeMastersList;