import express from "express";
import { todoRouter } from "./todoItems";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use('/todo', todoRouter);

app.use((req, res) => {
	res.status(404).send('Uh oh, looks like you messed up!');
});

const port = 4000;
app.listen(port);
console.log(`App listening on port ${port}`);
