import { FilePath } from "../../config.js";
export default async ({ response, request, params }) => {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  try {
    const {
      value: { title, completed },
    } = await request.body();
    const data = await Deno.readFile(FilePath);
    const todos = JSON.parse(decoder.decode(data));

    const updatedTodos = todos.map((todo) => {
      if (todo.id === Number(params.id)) {
        return { ...todo, title, completed };
      }
      return todo;
    });

    await Deno.writeFile(
      FilePath,
      encoder.encode(JSON.stringify(updatedTodos))
    );
    response.status = 200;
    response.body = { status: "Updated Successfully", updatedTodos };
  } catch (error) {
    response.status = 502;
    response.body = { status: "Failed", error };
  }
};
