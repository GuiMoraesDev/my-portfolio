import { NextResponse } from "next/server";

import repositories from "./src/data/repositories.json";

export const GET = async () => {
  return NextResponse.json({
    data: repositories,
  });
};
