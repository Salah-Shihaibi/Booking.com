import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getSavedListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const savedListings = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.savedIds || [])],
        },
      },
    });

    return savedListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
