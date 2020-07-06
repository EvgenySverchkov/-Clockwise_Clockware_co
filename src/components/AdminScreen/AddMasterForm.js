import React from 'react';
import PropTypes from 'prop-types';

function AddMasterForm({handler, townsArr}){
  return(
    <form onSubmit={handler}>
      <div className="form-group row justify-content-sm-center">
        <label htmlFor="rating" className="col-sm-3 col-xl-3 col-form-label">Enter rating</label>
        <div className="col-sm-3 col-xl-2">
          <input id="rating" className="form-control" type="number" min="0" max="5" />
        </div>
      </div>
      <div className="form-group row justify-content-sm-center">
        <label htmlFor="name" className="col-sm-3 col-xl-3 col-form-label">Enter name</label>
        <div className="col-sm-5 col-xl-4">
          <input id="name" className="form-control"/>
        </div>
      </div>
      <div className="form-group justify-content-sm-center">
        <div className="row justify-content-sm-center justify-content-center">Choose town</div>
        <div className="row justify-content-sm-center justify-content-center">
        {townsArr.map((item)=>(
          <div key={item.id+1} className="form-check-inline">
            <label className="form-check-label" htmlFor={item.name}>
              <input type="checkbox" className="form-check-input towns" id={item.name} value={item.name}/>
              {item.name}
            </label>
          </div>
        ))}
        </div>
      </div>
      <div className="row justify-content-sm-center">
        <input type="submit" value="Add" className="btn btn-primary col-12 col-sm-4 mt-3"/>
      </div>
    </form>
  );
}

AddMasterForm.propTypes = {
  handler: PropTypes.func,
  townsArr: PropTypes.array
}

export default AddMasterForm;
