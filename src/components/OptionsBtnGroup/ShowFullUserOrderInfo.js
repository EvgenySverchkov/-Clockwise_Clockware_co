import React from "react";
import { useDispatch } from "react-redux";
import { chngCurrItemForModal } from "../../store/adminModalWindows/actions";

const ShowFullUserOrderInfo = ({ itemObj }) => {
  const dispatch = useDispatch();
  return (
    <td className="text-center">
      <button
        onClick={() => {
          dispatch(chngCurrItemForModal(itemObj));
        }}
        type="button"
        className="btn btn-secondary"
        data-toggle="modal"
        data-target="#fullInfoModal"
      >
        Show full info
      </button>
    </td>
  );
};

export default ShowFullUserOrderInfo;
