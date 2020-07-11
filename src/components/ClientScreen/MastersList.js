import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

function MastersList(props) {
  if (props.suitableMasters.length === 0) {
    return (
      <>
        <div className="text-left display-4">
          We haven't masters in this city
        </div>
        <Link to="/client" className="btn btn-primary mt-5">
          Сome back
        </Link>
      </>
    );
  }
  return (
    <form onSubmit={props.submitHandler}>
      <div className="row">
        {props.suitableMasters.map((item) => {
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
        <Link to="/client" className="btn btn-primary">
          Сome back
        </Link>
      </div>
      <div className="form-group float-right mt-3">
        <input type="submit" value="Book now" className="btn btn-primary" />
      </div>
    </form>
  );
}

function mapStateToProps(state) {
  return {
    suitableMasters: state.client_order_reduser.suitableMasters,
    currentOrder: state.client_order_reduser.currentOrder,
  };
}

MastersList.propTypes = {
  mastersArr: PropTypes.array,
  currentOrder: PropTypes.object,
  submitHandler: PropTypes.func,
};

export default connect(mapStateToProps)(MastersList);
