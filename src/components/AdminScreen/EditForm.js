import React, {useState} from 'react';

export default function EditForm({id, handler, arrFromState}){
  let obj = arrFromState.find(item=>item.id === id);
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
            return null;
          }else{
            return (<div key={item} className="form-group row">
                <label htmlFor={item} className="col-sm-5 col-form-label">Enter {item}</label>
                <div className="col-sm-7">
                  {
                    item === "rating" ?
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
