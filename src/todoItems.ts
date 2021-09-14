import express from 'express';

export const todoRouter = express.Router();

const todoList: { id: string, contents: string}[] = [];
let currentId = 0;

todoRouter.get("", (req, res) => {
    res.send(todoList);
});

todoRouter.post("", (req, res) => {
    const { todoItem } = req.body;
    const newItem = {id: currentId.toString(), contents: todoItem};
    todoList.push(newItem);
    currentId++;
    res.send(newItem);
});

todoRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = todoList.findIndex(todoItem => todoItem.id === id);
    if(index === -1) {
      res.status(400).send('ERR: todo item must exist to be deleted');
      return;
    }
    todoList.splice(index, 1);
    res.send(200);
  })