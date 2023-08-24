import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: number;
}

export default async function getListingById(params: IParams) {
  try {
    const { listingId } = params;

    const listing = await prisma.listing.findUnique({
      where: {
        id: Number(listingId),
      },
      include: {
        user: true,
        reviews: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!listing) {
      return null;
    }

    return listing;
  } catch (error: any) {
    throw new Error(error);
  }
}
