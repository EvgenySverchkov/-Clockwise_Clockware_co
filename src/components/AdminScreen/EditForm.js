import React, {useState} from 'react';

export default function EditForm({id, handler, arrFromState}){
  let obj = arrFromState.find(item=>item.id == id);
  let [stateObj, setStateObj] = useState(obj);
  let keyArr = Object.keys(stateObj||{});

  function changeValue(e){
    setStateObj({...stateObj, [e.target.id] : e.target.value});
  }
  return (
    <form onSubmit={(e)=>handler(e, stateObj)} style={{width: '30%', margin: '0 auto'}}>
      {
        keyArr.map(item=>{
          if(item === 'id'){
            return;
          }else{
            return (<div key={item} className="form-group row">
                <label htmlFor={item} className="col-sm-5 col-form-label">Enter {item}</label>
                <div className="col-sm-7">
                  {
                    typeof obj[item] == "number" ?
                    <input id={item}
                           className="form-control"
                           type="number" min="0" max="5" value={stateObj[item]||''}
                           onChange={changeValue}/> :
                    <input id={item} className="form-control"
                           value={stateObj[item]||''} onChange={changeValue}/>
                  }
                </div>
              </div>);
          }
        })
      }
      <input type="submit" value="Edit" className="btn btn-primary"/>
    </form>
  );
}

// function EditMasterForm(props){
//   let master = props.mastersArr.find(item=>item.id == props.match.params.id)
//   let [masterObj, setMasterObj] = useState(master);
  // function changeValue(e){
  //   setMasterObj({...masterObj, [e.target.id]: e.target.value});
  // }
//   return(
//     <form onSubmit={(e)=>props.handler(e, masterObj)} style={{width: '30%', margin: '0 auto'}}>
//       <div className="form-group row">
//         <label htmlFor="rating" className="col-sm-5 col-form-label">Enter rating</label>
//         <div className="col-sm-3">
//           <input id="rating"
//                  className="form-control"
//                  type="number" min="0" max="5" value={masterObj.rating||''}
//                  onChange={changeValue}/>
//         </div>
//       </div>
//       <div className="form-group row">
//         <label htmlFor="name" className="col-sm-5 col-form-label">Enter name</label>
//         <div className="col-sm-7">
//           <input id="name" className="form-control" value={masterObj.name||''} onChange={changeValue}/>
//         </div>
//       </div>
//       <input type="submit" value="Edit" className="btn btn-primary"/>
//     </form>
//   );
// }
// export default EditForm;
// function isChecked(townName){
//   let townArr = masterObj.towns.split(",");
//   return townArr.includes(townName);
// }





// <div className="form-group">
//   <div className="mb-2">Choose town</div>
//   {props.townsArr.map((item)=>{
//     return (
//       <div key={item.id+1} className="form-check-inline">
//         <label className="form-check-label" htmlFor={item.name}>
//           <input type="checkbox"
//                  className="form-check-input towns"
//                  id={item.name} value={item.name}
//                  checked={isChecked(item.name)}
//                  onChange = {changeValue}/>
//           {item.name}
//         </label>
//       </div>
//     )
//   })}
// </div>
