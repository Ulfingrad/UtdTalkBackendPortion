import express from 'express';

export const todoRouter = express.Router(); // Creates and exports the router for the todo route

const todoList: { id: string, contents: string}[] = []; // Holds the list of todo items. Each todo item MUST be an object with an 'id' and 'contents' attribute, which both MUST be of type 'string'
let currentId = 0;

// Using the todoRouter, create a GET endpoint that sends back the todoList
todoRouter.get("", (req, res) => {
});

// Using the todoRouter, create a POST endpoint that takes 'todoItem' out of the request body, create a new item (which will be an object with 2 attributes, id and contents which are both strings), 
// push it onto the todoList array, increment the currentId, and send back the newly created item
todoRouter.post("", (req, res) => {
});

// Using the todoRouter, create a DELETE endpoint that expects an id as a router parameter (i.e. http://localhost:4000/todo/id), find the index of the element that matches the input id
// (and return a 400 status code if the id is not found), splice out that element from todoList, and send back a 200 status code
todoRouter.delete("/:id", (req, res) => {
});