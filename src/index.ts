import { config } from "dotenv";
import express from "express";
import { todoRouter } from "./todoItems";

config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello cruel world!");
});

app.use("/todo", todoRouter);

app.use((req, res) => {
  res.status(404).send("Whoops!");
});

const port = process.env.PORT || 4000;
app.listen(port);
console.log(`App listening on port ${port}`);