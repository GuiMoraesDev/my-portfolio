import { NextResponse } from "next/server";

import testimonials from "./src/data/testimonials.json";

export const GET = async () => {
  return NextResponse.json({
    data: testimonials,
  });
};
