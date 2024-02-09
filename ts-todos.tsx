import React, { useState } from "react";

interface Todo {
  item: string;
  completed: boolean;
}
const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [item, setItem] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos((prevTodos) => [...prevTodos, { item: item, completed: false }]);
    setItem("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem(e.target.value);
  };

  const handleToggle = (index: number) => {
    setTodos((prevTodos) => {
      const newTodos = [...prevTodos];
      newTodos[index] = {
        ...newTodos[index],
        completed: !newTodos[index].completed,
      };
      return newTodos;
    });
  };

  const handleRemove = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={item}
          placeholder="Enter todo item"
          onChange={handleChange}
        />
        <button type="submit">Add item</button>
      </form>

      <ol>
        {todos.map((todo, index) => {
          return (
            <li key={index}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(index)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {" "}
                {todo.item}
              </span>

              <button onClick={() => handleRemove(index)}>remove </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Todos;
