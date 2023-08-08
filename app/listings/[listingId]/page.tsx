import getCurrentUser from "@/app/actions/getCurrentUser";
// import getReservations from "@/app/actions/getReservations";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingPageClient from "./ListingPageClient";
import getListingById from "@/app/actions/getListingById";

interface IParams {
  listingId?: number;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState title="Listing does not exist" subtitle="" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingPageClient listing={listing} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ListingPage;
