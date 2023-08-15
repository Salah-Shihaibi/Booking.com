import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getSavedListings from "@/app/actions/getSavedListings";
import SavedClient from "./SavedClient";

const ListingPage = async () => {
  const listings = await getSavedListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No saved properties found"
          subtitle="Looks like you have no saved properties."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <SavedClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ListingPage;
