require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const { getAllTodos, getATodo, createATodo, updateATodo, deleteATodo } = require('../server/dataAccess/todoRepository')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDoc = YAML.load('./openapi.yaml');
const path = require('path');
const _dirname = path.resolve();

// middleware
app.use(cors());
app.use(express.json()); //req.body;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(express.static(path.join(_dirname, 'ui')));

// routes

app.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, 'ui', 'index.html'));
});

// create a todo
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        console.log(description);
        const newTodo = await createATodo(description);
        res.json(newTodo);

    } catch (err) {
        console.error(err.message);
    }
})
// get all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await getAllTodos()
        res.json(allTodos);
    } catch (err) {
        console.error(err.message)
    }
});
// get a todo
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await getATodo(id);
        res.json(todo);
    } catch (err) {
        console.error(err.message);
    }
})
// update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.params);
        const { description } = req.body;
        const updateTodo = await updateATodo(description, id);
        res.json("Todo was updated");
    } catch (err) {
        console.error(err.message);
    }
})
// delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await deleteATodo(id);
        res.json("Todo was deleted")
    } catch (err) {
        console.error(err.message);
    }
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server has started on port ${port}`)
});