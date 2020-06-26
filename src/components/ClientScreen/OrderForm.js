import React from 'react';

function OrderForm({submitHandler, townsArr, currentOrder}){
  return(
    <>
      <div className="text-center display-4 mb-1">You are welcomed by <span className="font-italic">Clockwise company</span>
      </div><br/>
      <div className="text-center">Fill out this form to order a master</div>
      <form onSubmit={submitHandler} style={{width: '40%', margin: '0 auto'}} className="mt-4">
        <div className="form-group row">
          <label htmlFor="town" className="col-sm-5 col-form-label font-weight-bold">Enter your name</label>
          <div className="col-sm-7">
            <input id="name" type="text" className="form-control" required/>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="email" className="col-sm-5 col-form-label font-weight-bold">Enter your e-mail</label>
          <div className="col-sm-7">
            <input id="email" type="email" className="form-control" required/>
          </div>
        </div>
        <div className="form-group">
          <div className="mb-2 font-weight-bold">Choose size of clock</div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="clockSize" id="smallSize" value="small"/>
            <label className="form-check-label" htmlFor="smallSize">Small</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="clockSize" id="middleSize" value="middle"/>
            <label className="form-check-label" htmlFor="middleSize">Middle</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="clockSize" id="largeSize" value="large"/>
            <label className="form-check-label" htmlFor="largeSize">Large</label>
          </div>
        </div>
        <div className="form-group">
          <div className="mb-2 font-weight-bold">Choose town</div>
          {townsArr.map((item)=>(
            <div key={item.id+1} className="form-check-inline">
              <label className="form-check-label" htmlFor={item.name}>
                <input type="radio" className="form-check-input" name="towns" id={item.name} value={item.name}/>
                {item.name}
              </label>
            </div>
          ))}
        </div>
        <div className="form-group">
          <div className="mb-2 font-weight-bold" >Choose date and time<br/><sub>*time from 8 to 18</sub></div>
          <input type="date" id="date" className="mr-1" required/>
          <input type="time" id="time" max="18:00" min="08:00" required/>
        </div>
        <div className="float-right">
            <input type="submit" value="Next step" className="btn btn-primary"/>
        </div>

      </form>
    </>
  );
}
export default OrderForm;
