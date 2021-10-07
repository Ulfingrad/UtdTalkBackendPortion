import express from 'express';
import { doThings } from './someFile';

export const todoRouter = express.Router(); // Creates and exports the router for the todo route

let todoList: { id: string, contents: string}[] = []; // Holds the list of todo items. Each todo item MUST be an object with an 'id' and 'contents' attribute, which both MUST be of type 'string'
let currentId = 0;

todoRouter.get('', (req, res) => { // Returns the list of todo items
    res.send(todoList);
});

todoRouter.get('/example', async (req, res) => {
  const { input } = req.body;
  try {
    const str = await doThings(input);
    res.send(str);
  } catch {
    res.status(400).send();
  }
});

todoRouter.post('', (req, res) => { // Adds a todo item to the todoList where the id is the currentId and the contents is the received todoItem
    const { todoItem } = req.body;
    const newItem = {id: currentId.toString(), contents: todoItem};
    todoList.push(newItem);
    currentId++; // Increments the currentId variable so that each todo item has a unique id
    res.send(newItem);
});

todoRouter.delete('/:id', (req, res) => { // Looks for an id to delete based on the route parameters (i.e. in http://localhost:4000/todo/3, 3 would be the route parameter)
    const { id } = req.params;
    const index = todoList.findIndex(todoItem => todoItem.id === id); // Will try to find a todo item with the corresponding received id and will return a -1 if no respective id is found
    if(index === -1) { // Any id not found will result in a 400 error (bad request)
      res.status(400).send('ERR: todo item must exist to be deleted');
      return;
    }
    todoList.splice(index, 1); // Splices (removes) the element with the specified id
    res.send(200);
  });

  todoRouter.delete('/', (req, res) => {
    todoList = [];
    currentId = 0;
    res.send({ todoList, currentId });
  });