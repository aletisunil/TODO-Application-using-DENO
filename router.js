import { Router } from "https://deno.land/x/oak/mod.ts";
import getTodos from "./Controllers/todos/get.js";
import postTodo from "./Controllers/todos/post.js";
import deleteTodo from "./Controllers/todos/delete.js";
import putTodo from "./Controllers/todos/put.js";

const router = new Router();

router.get("/", ({ response }) => {
  response.body = "Todo Application using Deno";
});

router
  .get("/todos", getTodos)
  .post("/todos", postTodo)
  .delete("/todos/:id", deleteTodo)
  .put("/todos/:id", putTodo);

export default router;
