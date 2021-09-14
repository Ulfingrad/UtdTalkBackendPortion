import express from 'express';

export const todoRouter = express.Router();

const todoList: { id: string}[] = [];

todoRouter.get("", (req, res) => {
    res.send(todoList);
});

todoRouter.post("", (req, res) => {
    const { todoItem } = req.body;
    todoList.push(todoItem);
    res.send(todoItem);
});

todoRouter.delete(':id', (req, res) => {
    const { id } = req.params;
    const index = todoList.findIndex(todoItem => todoItem.id === id);
    if(index === -1) {
      res.status(400).send('ERR: todo item must exist to be deleted');
      return;
    }
    todoList.splice(index, 1);
    res.send(todoList);
  })