import connectDB from "@/lib/connectDB";
import apiResponse from "@/lib/ApiRes";
import AdminModel from "@/models/admin";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();
    const queryRes = await AdminModel.findOne({ email });

    // if email is not the same as admin email, reject the request.
    if (!queryRes) {
      return Response.json(apiResponse("Authentication failed", 401, false));
    }

    if (!(await bcrypt.compare(password, queryRes.password))) {
      return Response.json(apiResponse("Authentication failed2", 401, false));
    }

    return Response.json(apiResponse("Login successful", 200, true, queryRes));
  } catch (error) {
    const errorMsg =
      error instanceof Error
        ? error.message
        : "Unexpected error occurred in /api/admin-login";

    return NextResponse.json(apiResponse(errorMsg, 500, false));
  }
}
