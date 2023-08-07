import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  email?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const email = params.email;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) return NextResponse.json(true);
  return NextResponse.json(false);
}
