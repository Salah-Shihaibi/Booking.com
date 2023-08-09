import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: number;
  userId?: number;
  userHasReservationOnListingId?: number;
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, userHasReservationOnListingId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = Number(listingId);
    }

    if (userId) {
      query.userId = Number(userId);
    }

    if (userHasReservationOnListingId) {
      query.listing = { userId: Number(userHasReservationOnListingId) };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!reservations) {
      return null;
    }

    return reservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
