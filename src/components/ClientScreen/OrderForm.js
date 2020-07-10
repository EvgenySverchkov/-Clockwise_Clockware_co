import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import './orderForm.css';

import {addCurrentOrderToState} from '../../store/clientSide/actions';

function OrderForm({submitHandler, townsArr, currentOrder, addCurrentOrderToState}){
  function handler(e){
    let idx = e.target.name;
    addCurrentOrderToState({...currentOrder, [idx]: e.target.value})
  }
  function minDate(){
    let date = new Date();
    return `${date.getFullYear()}-${('0' + (+date.getMonth()+1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
  }
  return(
    <>
      <div className="text-center mb-1">You are welcomed by <h1 className="font-italic">Clockwise company</h1>
      </div><br/>
      <div className="text-center">Fill out this form to order a master</div>
      <form onSubmit={submitHandler} className="mt-4 row justify-content-center">
        <div className="form-group row text-center text-sm-left col-12 col-md-10 col-lg-8">
          <label htmlFor="name" className="pl-0 pr-0 col-sm-4 col-md-4 col-form-label font-weight-bold">Enter your name</label>
          <div className="col-sm-8 col-md-8">
            <input id="name" type="text" name="name" className="form-control"
                   onChange={handler}
                   value={currentOrder.name || ''} required/>
          </div>
        </div>
        <div className="form-group row text-center text-sm-left col-12 col-md-10 col-lg-8">
          <label htmlFor="email" className="pl-0 pr-0 col-sm-4 col-md-4 col-form-label font-weight-bold">Enter your e-mail</label>
          <div className="col-sm-8 col-md-8">
            <input id="email" type="email" name="email" className="form-control"
                   onChange={handler} value={currentOrder.email||''} required/>
          </div>
        </div>
        <div className="form-group text-center text-sm-left col-12 col-md-10 col-lg-8">
          <div className="mb-2 font-weight-bold">Choose size of clock</div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" onChange={handler} name="size" id="smallSize" value="small"/>
            <label className="form-check-label" htmlFor="smallSize">Small</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" onChange={handler} name="size" id="middleSize" value="middle"/>
            <label className="form-check-label" htmlFor="middleSize">Middle</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" onChange={handler} name="size" id="largeSize" value="large"/>
            <label className="form-check-label" htmlFor="largeSize">Large</label>
          </div>
        </div>
        <div className="form-group text-center text-sm-left col-12 col-md-10 col-lg-8">
          <div className="mb-2 font-weight-bold">Choose town</div>
          {townsArr.map((item)=>(
            <div key={item.id+1} className="form-check-inline">
              <label className="form-check-label" htmlFor={item.name}>
                <input type="radio" className="form-check-input" onChange={handler} name="town" id={item.name} value={item.name}/>
                {item.name}
              </label>
            </div>
          ))}
        </div>
        <div className="form-group text-center text-sm-left col-12 col-md-10 col-lg-8">
          <div className="mb-2 font-weight-bold" >Choose date and time<br/><sub>*time from 8 to 18</sub></div>
          <input type="date" name="date" min={minDate()} className="mr-1" onChange={handler} value={currentOrder.date||''} required/>
          <input type="time" name="time" max="18:00" min="08:00" onChange={handler} value={currentOrder.time||''} required/>
        </div>
        <div className="row justify-content-sm-center col-12">
            <input type="submit" value="Next step" className="btn btn-primary col-12 col-sm-4 mt-3"/>
        </div>
      </form>
    </>
  );
}
function mapStateToProps(state){
  return {
    currentOrder: state.client_order_reduser.currentOrder
  }
}

OrderForm.propTypes = {
  currentOrder: PropTypes.object,
  submitHandler: PropTypes.func,
  townsArr: PropTypes.array,
  addCurrentOrderToState: PropTypes.func
}

export default connect(mapStateToProps, {addCurrentOrderToState})(OrderForm);
