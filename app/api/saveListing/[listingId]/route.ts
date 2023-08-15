import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: number;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  let savedListingIds = [...(currentUser.savedIds || [])];
  if (!listingId) {
    throw new Error("Invalid ID");
  } else {
    savedListingIds.push(Number(listingId));
  }

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      savedIds: savedListingIds,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  let savedListingIds = [...(currentUser.savedIds || [])];
  if (!listingId) {
    throw new Error("Invalid ID");
  } else {
    savedListingIds = savedListingIds.filter((id) => id !== Number(listingId));
  }

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      savedIds: savedListingIds,
    },
  });

  return NextResponse.json(user);
}
