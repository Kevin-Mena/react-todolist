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
    <div className="wrapper">
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

        <button type="submit" className="btn">
          {editId ? "Save" : "Submit"}
        </button>
      </form>
      {/* render todos below */}
      {todos.map((todo) => {
        return (
          <div key={todo.id} className="todo-list">
            <div className="inputs">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />

              <p className={todo.completed ? "completed" : ""}>{todo.name}</p>
            </div>
            <div className="btns">
              <button className="btn" onClick={() => removeTodo(todo.id)}>
                Remove
              </button>
              <button className="btn" onClick={() => editTodo(todo.id)}>
                Edit
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default TodoList;
