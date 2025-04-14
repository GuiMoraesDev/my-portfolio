import { type DevDotToArticle } from "./src/@types";

export async function GET() {
  try {
    const response = await fetch(
      "https://dev.to/api/articles?username=guimoraes",
    );

    const data: DevDotToArticle[] = await response.json();

    return Response.json({
      data,
    });
  } catch (error) {
    return Response.json({ error });
  }
}
