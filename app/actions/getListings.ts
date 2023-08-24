import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  location?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  const {
    userId,
    roomCount,
    guestCount,
    bathroomCount,
    location,
    startDate,
    endDate,
    category,
  } = params;
  try {
    let query: any = {};

    if (userId) {
      query.userId = Number(userId);
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if (location) {
      query.locationValue = location;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const listings = await prisma?.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        reviews: true,
      },
    });

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
