//CountProvider.tsx
import React, { createContext, useReducer, useContext } from "react";

interface State {
  count: number;
}

interface Action {
  type: "INCREMENT" | "DECREMENT" | "RESET";
}

interface ContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
  functions: {
    logCount: () => void;
  };
}

interface ParentProps {
  children: React.ReactNode;
}

const MyContext = createContext<ContextProps | undefined>(undefined);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "RESET":
      return { ...state, count: 0 };
    default:
      return state;
  }
};

export const CountProvider: React.FC<ParentProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  const logCount = () => {
    console.log("Count:", state.count);
  };

  const contextValue: ContextProps = {
    state,
    dispatch,
    functions: { logCount },
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

export const useCount = (): ContextProps => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
};

//App.tsx
import "./styles.css";
import { useCount, CountProvider } from "./CountProvider";
export default function App() {
  const { state, dispatch, functions } = useCount();
  const increment = () => {
    dispatch({ type: "INCREMENT" });
  };

  const decrement = () => {
    dispatch({ type: "DECREMENT" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  const handleLogCount = () => {
    functions.logCount();
  };

  return (
    <CountProvider>
      <div className="App">
        {state.count}
        <button onClick={increment}>Increment </button>
        <button onClick={decrement}>Decrement </button>
        <button onClick={reset}> Reset</button>
        <button onClick={handleLogCount}>Log Count</button>
      </div>
    </CountProvider>
  );
}

//index.tsx
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CountProvider } from "./CountProvider";
import App from "./App";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <CountProvider>
        <App />
      </CountProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found!");
}
