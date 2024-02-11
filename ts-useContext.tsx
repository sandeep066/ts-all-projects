import React, { useContext, createContext } from "react";

interface IContext {
  text: string;
}

interface ParentProps {
  children: React.ReactNode;
}
const Store = createContext<IContext | undefined>(undefined);

const Parent: React.FC<ParentProps> = ({ children }) => {
  const obj = {
    text: "Hello Sandeep",
  };
  return <Store.Provider value={obj}>{children}</Store.Provider>;
};

const Child: React.FC = () => {
  const hook = useContext(Store);
  if (!hook) {
    return null;
  }

  return <div>{hook.text}</div>;
};

export { Parent, Child };
