import React, { Fragment, useState, useEffect } from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {
    const [todos, setTodos] = useState([]);
    // delete todo function
    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });
            // filter is to delete todo in browser without to refresh page!
            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }

    // get todos function
    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();

            setTodos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getTodos();
    }, []);
    console.log(todos);
    return (
        <Fragment>
            <table className="table text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>

                    {/* <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr> */}
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td><EditTodo todo={todo} /></td>
                            <td><button className="btn" style={{ background: "aqua" }}
                                onClick={() => deleteTodo(todo.todo_id)}>
                                Delete
                                </button></td>
                        </tr>
                    ))}

                </tbody>

            </table>
        </Fragment>

    )
};

export default ListTodos;