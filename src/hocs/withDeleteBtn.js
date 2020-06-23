import React from 'react';
export default (Component, action)=>{
  return class WithDeleteBtn extends React.Component{
    constructor(props){
      super(props);
      this.handler = this.handler.bind(this);
    }
    handler(){
      action(this.props.by);
    }
    render(){
      return (
        <>
          <Component {...this.props}/>
          <td>
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Options
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <button onClick={this.handler} className="dropdown-item">Delete</button>
                </div>
            </div>
          </td>
        </>
      );
    }
  }
}
