import React from "react";

// Define interface for input props for MyComponent
interface MyComponentInputProps {
  name: string;
  age: number;
}

// Define interface for output props for MyComponent
interface MyComponentOutputProps {
  greeting: string;
}

// Define MyComponent as a functional component
const MyComponent: React.FC<MyComponentInputProps> = ({
  name,
  age,
}): React.ReactElement<MyComponentOutputProps> => {
  // Calculate a message based on props
  const greeting: string = `Hello, ${name}! You are ${age} years old.`;

  // Return the JSX element containing the greeting message
  return <div>{greeting}</div>;
};

interface MyAppProps {
  greeting: string;
}

// Define MyApp as a functional component
const MyApp: React.FC<MyAppProps> = ({ greeting }) => {
  return (
    <div>
      {/* Render MyComponent with the greeting message */}
      <MyComponent name="John1" age={30} />
    </div>
  );
};

// Export MyApp
export default MyApp;


/*In this example:

MyComponentInputProps defines the structure of input props for MyComponent, including name and age.
MyComponentOutputProps defines the structure of output props for MyComponent, including greeting.
MyComponent uses these separate interfaces for input and output props.
This separation makes it clear which props are expected as input and what the component will return as output.
MyApp remains unchanged, using only the output prop defined by MyComponentOutputProps.*/
