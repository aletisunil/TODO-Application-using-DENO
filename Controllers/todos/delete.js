import { FilePath } from "../../config.js";
export default async ({ response, params }) => {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  try {
    const data = await Deno.readFile(FilePath);
    const todos = JSON.parse(decoder.decode(data));

    const updatedTodos = todos.filter((todo) => todo.id !== params.id);
    console.log(params.id);
    await Deno.writeFile(
      FilePath,
      encoder.encode(JSON.stringify(updatedTodos))
    );
    response.status = 200;
    response.body = { status: "Deleted Successfully", data: updatedTodos };
  } catch (error) {
    response.status = 502;
    response.body = { status: "Failed to delete", error };
  }
};
