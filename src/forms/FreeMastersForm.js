import React from "react";
import PropTypes from "prop-types";

import MasterCard from "../components/FreeMasterList/MasterCard";
import ComeBackBtn from "../components/FreeMasterList/ComeBackBtn";
import SubmitBtn from "../components/FreeMasterList/SubmitBtn";

import EmptyList from "../components/FreeMasterList/EmptyList";

function FreeMastersList({
  submitHandler,
  isLoad,
  suitableMasters,
  backTo,
  isMakeOrder,
}) {
  if (suitableMasters.length === 0 || isMakeOrder) {
    return (
      <>
        <EmptyList>List is empty...</EmptyList>
        <ComeBackBtn backTo={backTo} />
      </>
    );
  }
  return (
    <form onSubmit={submitHandler}>
      <div className="row">
        {suitableMasters.map((item) => {
          return (
            <MasterCard
              id={item.id}
              name={item.name}
              rating={item.rating}
              key={item.id}
            />
          );
        })}
      </div>
      <ComeBackBtn backTo={backTo} />
      <SubmitBtn loading={isLoad} />
    </form>
  );
}

FreeMastersList.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  suitableMasters: PropTypes.array,
  backTo: PropTypes.string.isRequired,
};

export default FreeMastersList;
