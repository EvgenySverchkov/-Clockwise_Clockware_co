import React from 'react';

function AddMasterForm({handler, townsArr}){
  return(
    <form onSubmit={handler}>
      <label htmlFor="rating">Enter reting</label>
      <input id="rating" type="number" min="0" max="5" /><br />

      <label htmlFor="name">Enter name</label>
      <input id="name" /><br />

      <label htmlFor="towns">Choose town</label>
      {townsArr.map((item)=>(
        <div key={item}>
          <label>{item}</label>
          <input type="checkbox" className="towns" id={item} value={item}/>
        </div>
      ))}
      <br/>
      <input type="submit" value="Add" />
    </form>
  );
}
export default AddMasterForm;
