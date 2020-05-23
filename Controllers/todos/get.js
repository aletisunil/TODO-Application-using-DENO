import { FilePath } from "../../config.js";

export default async ({ response }) => {
  const decoder = new TextDecoder();
  const data = await Deno.readFile(FilePath);
  const todos = JSON.parse(decoder.decode(data));
  try {
    response.status = 200;
    response.body = { todos };
  } catch (error) {
    response.status = 500;
    response.body = { status: "failed", todos: [] };
  }
};
