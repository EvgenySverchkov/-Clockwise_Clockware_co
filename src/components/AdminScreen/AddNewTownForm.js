import React from 'react';

function AddNewTownForm({handler}){
  return(
    <form onSubmit={handler}>
      <label htmlFor="town">Enter new town</label>
      <input id="town" type="text" /><br />

      <input type="submit" value="Add town" />
    </form>
  );
}
export default AddNewTownForm;
