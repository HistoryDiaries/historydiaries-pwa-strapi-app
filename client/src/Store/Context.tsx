import * as React from "react";
import { Istore } from "../Interfaces";

const Store = React.createContext<Istore | any>({
  programs: null,
});

export default Store;
