import React from "react";

import RadioBtn from "../FormComponents/RadioBtn";
import Label from "../FormComponents/Label";


const RadioBtnWithLabel = ({id, value, name, changeHandler}) => (
<RadioBtn
    id={id}
    value={value}
    name={name}
    chngHandler={changeHandler}
>
    <Label forId={id} isFontWeight={false}>
        Large
    </Label>
</RadioBtn>
);

export default RadioBtnWithLabel;