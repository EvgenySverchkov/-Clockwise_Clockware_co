import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Label from "../FormComponents/Label";
import NumField from "../FormComponents/NumField";
import TextField from "../FormComponents/TextField";
import FormGroup from "../FormComponents/FormGroup";
import Button from "../FormComponents/Button";

function EditForm({ id, handler, arrFromState, editFormIsLoad }) {
  let obj = arrFromState.find((item) => item.id === id);
  let [stateObj, setStateObj] = useState(obj);
  let keyArr = Object.keys(stateObj || {});

  function changeValue(e) {
    setStateObj({ ...stateObj, [e.target.id]: e.target.value });
  }
  return (
    <form onSubmit={(e) => handler(e, stateObj)} className="mt-4 row justify-content-center"> 
      {keyArr.map((item) => {
        if (item === "id") {
          return null;
        } else {
          return (
            <FormGroup>
              <Label forId={item}>Enter {item}</Label>
                {item === "rating" ? (
                  <NumField id={item} min={0} max={5} value={stateObj[item] || ""} onChange={changeValue}/>
                ) : (
                  <TextField id={item} value={stateObj[item] || ""} chngHandler={changeValue}/>
                )}
            </FormGroup>
          );
        }
      })}
      <Button value={"Edit"}/>
    </form>
  );
}

EditForm.propTypes = {
  id: PropTypes.number,
  handler: PropTypes.func,
  arrFromState: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    editFormIsLoad: state.main_adminPanel_reduser.editFormIsLoad,
  };
}

export default connect(mapStateToProps)(EditForm);
