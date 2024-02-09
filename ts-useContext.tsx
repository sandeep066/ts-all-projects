import React, { useContext, createContext } from "react";

interface IContext {
  text: string;
}

interface ParentProps {
  children: React.ReactNode;
}
const Store = createContext<IContext | undefined>(undefined);

const Parent = (props: ParentProps) => {
  const obj = {
    text: "Hello Sandeep",
  };
  return <Store.Provider value={obj}>{props.children}</Store.Provider>;
};

const Child = () => {
  const hook = useContext(Store);
  if (!hook) {
    return null;
  }

  return <div>{hook.text}</div>;
};

export { Parent, Child };
