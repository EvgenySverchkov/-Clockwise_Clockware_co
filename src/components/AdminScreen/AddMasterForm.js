import React from 'react';

function AddMasterForm({handler, townsArr}){
  return(
    <form onSubmit={handler} style={{width: '30%', margin: '0 auto'}}>
      <div className="form-group row">
        <label htmlFor="rating" className="col-sm-5 col-form-label">Enter rating</label>
        <div className="col-sm-3">
          <input id="rating" className="form-control" type="number" min="0" max="5" />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="name" className="col-sm-5 col-form-label">Enter name</label>
        <div className="col-sm-7">
          <input id="name" className="form-control"/>
        </div>
      </div>
      <div className="form-group">
        <div className="mb-2">Choose town</div>
        {townsArr.map((item)=>(
          <div key={item.id+1} className="form-check-inline">
            <label className="form-check-label" htmlFor={item.name}>
              <input type="checkbox" className="form-check-input towns" id={item.name} value={item.name}/>
              {item.name}
            </label>
          </div>
        ))}
      </div>
      <input type="submit" value="Add" className="btn btn-primary"/>
    </form>
  );
}
export default AddMasterForm;
