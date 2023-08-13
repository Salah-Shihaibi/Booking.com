import getListings from "./actions/getListing";
import ListingCard from "./components/listing/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();
  return (
    <ClientOnly>
      <main>
        <div
          className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-4
        max-w-[2520px]
        "
        >
          {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </main>
    </ClientOnly>
  );
}
