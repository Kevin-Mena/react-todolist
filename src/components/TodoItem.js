import { useState } from "react";

const TodoList = () => {
  const [name, setName] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name) return;
    if (editId !== null) {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === editId) {
          return { ...todo, name };
        }
        return todo;
      });
      setTodos(updatedTodos);
      setName("");
      setEditId(null);
    } else {
      const todoId = Date.now();
      const newTodos = { id: todoId, name };
      const updatedTodos = [...todos, newTodos];
      setTodos(updatedTodos);
      setName("");
    }
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setName(todoToEdit.name);
    setEditId(id);
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Todo List App</h1>
        <div className="form-row">
          <label htmlFor="name" className="form-label">
            {editId ? "Edit Todo" : "Add Todo"}
          </label>
          <input
            type="text"
            className="form-input"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={editId ? "Edit todo..." : "Enter a new todo..."}
          />
        </div>

        <button type="submit" className="btn-submit">
          {editId ? "Save" : "Submit"}
        </button>
      </form>
      {/* render todos below */}
      <h2>Added TODOs</h2>
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <h4 className={todo.completed ? "completed" : ""}>{todo.name}</h4>
            <button className="btn" onClick={() => removeTodo(todo.id)}>
              Remove
            </button>
            <button className="btn" onClick={() => editTodo(todo.id)}>
              Edit
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default TodoList;
