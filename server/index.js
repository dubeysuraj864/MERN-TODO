const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
const Port = 5000;

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://suraj864:Suraj%40864@cluster0.99t01ap.mongodb.net/MERN-TODO",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> {
    console.log("connected to DB")
}).catch(console.error)

const Todo = require("./models/Todo")

app.get("/todos", async (req, res)=> {
    const todos = await Todo.find();
    res.json(todos);
})

app.post("/todo/new", (req, res)=> {
    const todo = new Todo({
        text: req.body.text
    })
    todo.save();
    res.json(todo);
})

app.delete("/todo/delete/:unique_identifier", async(req, res)=> {
    const result = await Todo.findOneAndDelete(req.params.unique_identifier)

    res.json(result);
})

app.put("/todo/complete/:unique_identifier",async(req , res)=> {
    const todo = await Todo.findById(req.params.unique_identifier)
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);

})

app.listen(Port, ()=> {
    console.log(`server started at port ${Port}`)
})
