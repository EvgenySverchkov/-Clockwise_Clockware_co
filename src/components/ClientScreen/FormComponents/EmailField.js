import React from "react";

const EmailField = ({id}) => (
    <div className="col-sm-8 col-md-8">
        <input id={id} type="email" name="email" className="form-control" required />
    </div>
);

export default EmailField;