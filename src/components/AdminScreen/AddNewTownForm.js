import React from 'react';
import PropTypes from 'prop-types';

function AddNewTownForm({handler}){
  return(
    <form onSubmit={handler} style={{width: '30%', margin: '0 auto'}}>
      <div className="form-group row">
        <label htmlFor="town" className="col-sm-5 col-form-label">Enter new town</label>
        <div className="col-sm-7">
          <input id="town" type="text" className="form-control"/>
        </div>
      </div>
      <input type="submit" value="Add town" className="btn btn-primary"/>
    </form>
  );
}

AddNewTownForm.propTypes = {
  handler: PropTypes.func
}

export default AddNewTownForm;
