import express from 'express';

export const todoRouter = express.Router();

const todoList: string[] = [];

todoRouter.get('', (req, res) => {
    res.send(todoList);
});

todoRouter.post('', (req, res) => {
    const { todoItem } = req.body;
    todoList.push(todoItem);
    res.send(todoList);
});

todoRouter.delete('', (req, res) => {
  const { todoItem } = req.body;
  if(todoList.indexOf(todoItem as string) === -1) {
    res.status(400).send('ERR: todo item must exist to be deleted');
    return;
  }
  todoList.splice(todoList.indexOf(todoItem as string), 1);
  res.send(todoList);
})