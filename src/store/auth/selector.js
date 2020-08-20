import store from "../index";

export default () => {
  return {
    signUpIsLoad: store.getState().authReducer.signUpIsLoad,
  };
};
