import React from 'react';
import RadioBtn from "../FormComponents/RadioBtn";
import Label from "../FormComponents/Label";

const MasterCard = ({id, name, rating, towns})=>(
    <div className="col-sm-4 mb-2 col-sm-6 col-lg-4">
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">Rating: {rating}</p>
                <p className="card-text">Towns: {towns}</p>
                <RadioBtn id={id} value={id} name={"chooseMaster"}>
                    <label className="form-check-label" htmlFor={id}>
                      Choose
                    </label>
                </RadioBtn>
                </div>
              </div>
            </div>
);

export default MasterCard;