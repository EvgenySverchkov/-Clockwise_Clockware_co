import React from "react";
import PropTypes from "prop-types";

function DeleteBtn({ deleteMasterById, id }) {
  return (
    <button onClick={() => deleteMasterById(id)} className="dropdown-item">
      Delete
    </button>
  );
}

DeleteBtn.propTypes = {
  deleteMasterById: PropTypes.func,
  id: PropTypes.number,
};

export default DeleteBtn;
