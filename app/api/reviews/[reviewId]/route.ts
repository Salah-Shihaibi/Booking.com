import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  reviewId?: number;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reviewId } = params;

  if (!reviewId) {
    throw new Error("Invalid ID");
  }

  const review = await prisma.review.deleteMany({
    where: {
      id: Number(reviewId),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(review);
}
