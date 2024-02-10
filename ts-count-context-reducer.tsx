import React, { useContext, createContext, useReducer } from "react";

interface State {
  count: number;
}

interface Action {
  type: "INCREMENT" | "DECREMENT" | "RESET";
}

interface contextprops {
  state: State;
  dispatch: React.Dispatch<Action>;
  functions: {
    logCount: () => void;
  };
}

interface ParentProps {
  children: React.ReactNode;
}

const Store = createContext<contextprops | undefined>(undefined);

const logCount = () => {
  console.log("Logging count...");
  alert("logCount(): Logging count !!!");
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
};

export const CountProvider: React.FC<ParentProps> = ({ children }) => {
  const initialState = {
    count: 0,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const functions = {
    logCount,
  };

  return (
    <Store.Provider value={{ state, dispatch, functions }}>
      {children}
    </Store.Provider>
  );
};

const countChild = () => {
  const hook = useContext(Store);

  if (!hook) {
    return null;
  }

  return hook;
};

export const CountProviderObject = { CountProvider, countChild };
