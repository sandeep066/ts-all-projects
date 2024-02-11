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




/*
1)const Store = createContext<IContext | undefined>(undefined);

The reason for defining undefined twice in the createContext function call is to provide
both the initial value and the default value for the context.

Here's the breakdown:

createContext<IContext | undefined>(undefined):

This part of the code defines a new context called Store.
IContext | undefined specifies the type of the context value. It means the context value can either be of type IContext or undefined.
The undefined inside the angle brackets <...> provides the default value for the context. It specifies that the initial value of the
context is undefined.
This default value is used when a component consumes the context but there is no corresponding provider higher up in the component tree.
const Store = createContext<IContext | undefined>(undefined);:

This line of code declares a constant variable named Store and initializes it with the created context using createContext.
The context is defined with a type that allows either IContext or undefined.
The initial value of the context is set to undefined as specified in the createContext call.
By providing undefined as both the type and the initial value, we ensure that the context is correctly initialized 
with an undefined value when no provider is present, and it's clear to TypeScript that the context value can potentially
be undefined. This helps maintain type safety throughout the application when using the context.

2)const Parent: React.FC<ParentProps> = ({ children }) => {}

React.FC stands for "React Function Component". It denotes that Parent is a function component in React.

In TypeScript, React.FC is a generic type provided by the React library.
It's used to define function components in React applications.

The type parameter <ParentProps> specifies the type of props that the component expects to receive.
In the context of React.FC<ParentProps>, ParentProps represents the input props for the component, i.e.,
the props that are passed into the component from its parent.
So, in summary, React.FC is used to define a function component in React, and ParentProps represents 
the input props for the Parent component.


*/
