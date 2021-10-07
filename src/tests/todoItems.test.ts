import "jest";
import supertest from "supertest";
import { app } from "../app";
import { doThings } from "../someFile";

jest.mock('../someFile');

describe("todo routes", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await supertest(app)
    .delete("/todo");
  });

  it("will successfully make a get request on /todo", async () => {
    const result = await supertest(app)
      .get("/todo")
      .expect(200);
    expect(result.body).toEqual([]);
  });

  
  it("will successfully make a post request on /todo", async () => {
    const result = await supertest(app)
    .post("/todo")
    .send({ todoItem: "this is a todo item" })
    .set({
      "Content-Type": "application/json",
    })
    .expect(200);
  
    expect(result.body).toEqual({ id: '0', contents: 'this is a todo item'});
  });

  it("will successfully make a delete request on /todo/:id given a todoitem id that exists", async () => {
    await supertest(app)
      .post("/todo")
      .send({ todoItem: "this is a todo item" })
      .expect(200);
    await supertest(app)
      .delete("/todo/0")
      .expect(200);
    const result = await supertest(app)
      .get("/todo")
      .set({
        "Content-Type": "application/json",
      })
      .expect(200);
    expect(result.body).toEqual([]);
  });

  it("will throw a 400 if a delete request is made without specifying an id on /todo", async () => {
    await supertest(app)
      .post("/todo")
      .send({ todoItem: "this is a todo item" })
      .set({
        "Content-Type": "application/json",
      })
      .expect(200);
    await supertest(app)
      .delete("/todo/1234")
      .expect(400);
    const result = await supertest(app)
      .get("/todo")
      .expect(200);
    expect(result.body).toEqual([{ id: '0', contents: 'this is a todo item'}]);
  });

  it("will successfully delete all todo items and reset the id count", async () => {
    await supertest(app)
      .post("/todo")
      .send({ todoItem: "this is a todo item" })
      .expect(200);
    const result = await supertest(app)
      .delete("/todo")
      .expect(200);
    expect(result.body).toEqual({ todoList: [], currentId: 0 });
  });

  it("will make a get request /todo/example", async () => {
    (doThings as jest.Mock).mockResolvedValueOnce('hello and goodbye');
    const result = await supertest(app)
      .get("/todo/example")
      .send({ todoItem: "hello" })
      .set({
        "Content-Type": "application/json",
      })
      .expect(200);
    expect(result.text).toEqual('hello and goodbye');
  });

  it("will throw a 400 if there is an issue when doing things", async () => {
    (doThings as jest.Mock).mockRejectedValueOnce('err');
    const result = await supertest(app)
      .get("/todo/example")
      .send({ todoItem: "hello" })
      .set({
        "Content-Type": "application/json",
      })
      .expect(400);
  });
});