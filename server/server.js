const SERVER_PORT = process.env.PORT || 4000;
const express = require("express");
const cors = require("cors");
const { request } = require("express");

const app = express();
const todos = {
  greg : ["demo"],
  ben : ["answer"]
};

app.use(express.json());
app.use(cors());

/*
S1: Return an array of strings for the GET /todos endpoint
S2: Add an endpoint to allow the addition of a new todo ({"value":"text for the todo"}) for the POST /todos endpoint
S3: Add a GET todos/:name endpoint with a route parameter to allow different todo lists with different names
S4: Add a POST todos/:name endpoint to allow posting of a new todo to different todo lists with different names
*/

app.get("/todos", (request, response) => {
  response.status(200).send(todos);
});

app.post("/todos", (request, response) => {
  todos["ben"].push(request.body.value);
  response.status(201).send(todos);
});

app.get("/todos/:name", (request, response) => {
  const name = request.params.name;
  let todosForName = todos[name];

  if (!todosForName) {
    response.status(404).send("Couldn't find any todos for" + name);
  }
  response.status(200).send(todosForName);
});

app.post("/todos/:name", (request, response) =>{
  const name = request.params.name;
  const newTodo = request.body.value;
  if(todos[name]===undefined) {
    todos[name] = [];
  }
  // console.log(name, newTodo);
  todos[name.push(newTodo)]
  response.status(201).send(); //201 created
});


app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));
