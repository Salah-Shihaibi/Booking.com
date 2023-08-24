import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();
  const { listingId, title, description, reviewScore } = body;

  const listingAndReviews = await prisma.listing.update({
    where: {
      id: Number(listingId),
    },
    data: {
      reviews: {
        create: {
          userId: currentUser.id,
          title,
          description,
          reviewScore,
        },
      },
    },
  });

  return NextResponse.json(listingAndReviews);
}
