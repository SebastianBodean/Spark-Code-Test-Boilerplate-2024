import React, { useEffect, useState } from 'react';
import './App.css';
import Todo, { TodoType } from './Todo';

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);

  // Initially fetch todo
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await fetch('http://localhost:8080/');
        if (todos.status !== 200) {
          console.log('Error fetching data');
          return;
        }

        setTodos(await todos.json());
      } catch (e) {
        console.log('Could not connect to server. Ensure it is running. ' + e);
      }
    }

    fetchTodos()
  }, []);

  //Implement it as a lambda expression- it will not be used anywhere else
  const PostTodo = () => {
    //Get the values from the input fields
    //I assume there won't be any other fields with the same name- IDs would be better
    const title = (document.getElementsByName("title")[0] as HTMLInputElement).value;
    const description = (document.getElementsByName("description")[0]  as HTMLInputElement).value;
    
    // TODO: add validation here

    //Send a post request to this address
    // TODO: test that the todos are appended correctly
    fetch('http://localhost:8080/', {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ 
        key: title + description,
        title: title,
        description: description
      })
    })
  }

  //Test that PostTodo is called by the button with the correct parameters
  return (
    <div className="app">
      <header className="app-header">
        <h1>TODO</h1>
      </header>

      <div className="todo-list">
        {todos.map((todo) =>
          <Todo
            key={todo.title + todo.description}
            title={todo.title}
            description={todo.description}
          />
        )}
      </div>

      <h2>Add a Todo</h2>
      <form>
        <input placeholder="Title" name="title" autoFocus={true} />
        <input placeholder="Description" name="description" />
        <button onClick="PostTodo">Add Todo</button>
      </form>
    </div>
  );
}

export default App;
