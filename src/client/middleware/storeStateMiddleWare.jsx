const storeStateMiddleWare = ({ getState }) => next => (action) => {
  const returnValue = next(action);
  window.top.state = getState();
  return returnValue;
};

export default storeStateMiddleWare;
