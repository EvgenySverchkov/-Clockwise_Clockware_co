import React from 'react';
export default (Component, action)=>{
  return class Hoc extends React.Component{
    constructor(props){
      super(props);
      this.handler = this.handler.bind(this)
    }
    handler(){
      action(this.props.by);
    }
    render(){
      return (
        <>
          <Component {...this.props}/>
          <button onClick={this.handler}>Delete</button>
        </>
      );
    }
  }
}
