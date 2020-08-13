import React from "react";

import FormGroup from "../FormComponents/FormGroup";
import CheckBtn from "../FormComponents/CheckBtn";

const SelectTownsField = ({townsArr, changeHandler, nm}) => (
<FormGroup isRow={false}>
    <div className="mb-2 font-weight-bold">Choose towns</div>
    <div>
        {townsArr.map((item) => (
            <CheckBtn name = {item.name} nm={"towns"} id = {item.id} key = {item.name} changeHandler = {changeHandler}/>
        ))}
    </div>
</FormGroup>
);

export default SelectTownsField;