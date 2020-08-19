import React from "react";
import { useDispatch } from "react-redux";
import { chngCurrItemForModal } from "../../../store/adminModalWindows/actions";

function ShowFullInfo({ itemObj }) {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        dispatch(chngCurrItemForModal(itemObj));
      }}
      type="button"
      className="dropdown-item"
      data-toggle="modal"
      data-target="#fullInfoModal"
    >
      Show full info
    </button>
  );
}

export default ShowFullInfo;
