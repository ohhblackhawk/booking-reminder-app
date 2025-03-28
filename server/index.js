const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");


//middleware
app.use(cors());
//getting data from client side
//allowing access to request.body
app.use(express.json()); //req.body

//routes//

// create todo
app.post("/todos", async(req,res) => {
    //await
    try {
    console.log(req.body);
    const { description } = req.body;
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",
        [description]
    );

    res.json(newTodo.rows[0]);


    } catch (error) {
        console.error(error.message);
        
    }

})

// get all todo

app.get("/todos", async(req,res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);

        
    } catch (error) {
        console.error(error.message);
    }
})

// get a todo 
app.get("/todos/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
        res.json(todo.rows[0]);
        
    } catch (error) {
        console.error(error.message);
    }
})

// update a todo
app.put("/todos/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description,id])
        res.json("Todo was updated");
    } catch (error) {
        console.error(error.message);
        
    }
})

// delete a todo

app.delete("/todos/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo was deleted");

        
    } catch (error) {
        console.log(error.message)
        
    }
})



app.listen(5000, () =>{
    console.log("Server has started on port 5000");
});
