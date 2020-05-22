import { FilePath } from "../../config.js";

export default async ({ response, request }) => {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  try {
    const {
      value: { title },
    } = await request.body();
    const data = await Deno.readFile(FilePath);
    const todos = JSON.parse(decoder.decode(data));

    const newTodo = { id: todos.length + 1, title, completed: false };
    todos.push(newTodo);

    await Deno.writeFile(FilePath, encoder.encode(JSON.stringify(todos)));
    response.status = 200;
    response.body = { status: "Inserted Successfully", newTodo };
  } catch (error) {
    response.status = 502;
    response.body = { status: "Failed", error };
  }
};
