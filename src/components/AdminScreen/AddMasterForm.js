import React from 'react';
import PropTypes from 'prop-types';

function AddMasterForm({handler, townsArr}){
  return(
    <form onSubmit={handler} className="mt-4 row justify-content-center">
      <div className="form-group row text-center text-sm-left col-sm-8 col-md-10 col-lg-8">
        <label htmlFor="rating" className="col-sm-4 pl-0 col-form-label">Enter rating</label>
        <div className="col-sm-3">
          <input id="rating" className="form-control" type="number" min="0" max="5" />
        </div>
      </div>
      <div className="form-group row text-center text-sm-left col-sm-8 col-md-10 col-lg-8">
        <label htmlFor="name" className="col-sm-4 pl-0 col-form-label">Enter name</label>
        <div className="col-sm-8">
          <input id="name" className="form-control"/>
        </div>
      </div>
      <div className="form-group text-center text-sm-left col-sm-8 col-md-10 col-lg-8">
        <div className="mb-2">Choose town</div>
        <div>
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
      <div className="row justify-content-sm-center col-12">
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
