import { Istore } from "../Interfaces";

type Action = { type: "LOADING"; payload: boolean };

const Reducer = (state: Istore, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
};

export default Reducer;
