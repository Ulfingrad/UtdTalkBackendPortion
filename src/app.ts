import express from "express";
import cors from "cors";
import { todoRouter } from "./todoItems";

export const app = express(); // Creates our express app
app.use(express.json()); // Lets the app know that it will potentially be receiving JSON objects
app.use(cors()); // Necessary in order to interact with the front end

app.get("", (req, res) => { // simple example of a 'get' endpoint, as we are getting back the string 'Hello world!'
    res.send("Hello world!");
})

app.use("/todo", todoRouter); // Adds the /todo route

app.use((req, res) => { // Any route not specified will result in a 404 (not found)
    res.status(404).send('you done goofed');
});