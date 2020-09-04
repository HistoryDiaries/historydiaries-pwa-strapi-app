import * as React from "react";
import Store from "./Context";
import Reducer from "./Reducer";

interface Iprops {
  children: React.ReactNode;
}

const StoreProvider: React.FC<Iprops> = ({ children }) => {
  const initialState = React.useContext(Store);
  const [state, dispatch] = React.useReducer(Reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}> {children}</Store.Provider>
  );
};

export default StoreProvider;
