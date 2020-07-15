import React from "react";

const FormGroup = ({children, isRow=true}) => (
    <div className={`form-group ${isRow ? 'row':''} text-center text-sm-left col-12 col-md-10 col-lg-8`}>
        {children}
    </div>
);

export default FormGroup;