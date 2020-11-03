import React, { useState } from "react";
import { Layout } from 'antd';
import Mylogo from '../images/logo5.png';
const { Header } = Layout;
const MylogoElement = <img src={Mylogo} alt="logo" />

const InputTodo = () => {
    const [description, setDescription] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = "/";
            console.log(response);
        } catch (err) {
            console.error(err.message);
        }
    }
    return (
        <div>
            <div className="container d-flex">
                <Header className="logo">
                    {MylogoElement}
                </Header>
                <h1 className="text-center" style={{ marginTop: 60, marginLeft: 30 }}>My Todo List</h1>
            </div>

            <form className="d-flex" onSubmit={onSubmitForm}>
                <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
                <button className="btn" style={{ background: "pink" }}>Add</button>
            </form>
        </div>

    )



};

export default InputTodo;