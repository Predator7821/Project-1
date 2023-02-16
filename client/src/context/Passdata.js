import { createContext, useReducer } from "react";

export const Logincontext = createContext(null);

export const Currentusercontext = createContext(null);

export const Searchresultscontext = createContext(null);

export const Catsearchcontext = createContext(null);

export const Checkpremiumcontext = createContext(null);

export const User_idcontext = createContext(null);

export const Moviefetchcontext = createContext(null);

export const Cartcontext = createContext();
export const Passdata = (props) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        alert("the item was added to your watch list");
        const tempstate = state.filter((item) => action.payload.id === item.id);
        if (tempstate.length > 0) {
          return state;
        } else {
          return [...state, action.payload];
        }
      case "REMOVE":
        const tempstate3 = state.filter(
          (item) => item.id !== action.payload.id
        );
        return tempstate3;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, []);
  const info = { state, dispatch };
  return (
    <Cartcontext.Provider value={info}>{props.children}</Cartcontext.Provider>
  );
};
