import getListings from "./actions/getListing";
import ListingCard from "./components/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();
  return (
    <main>
      <div
        className="
        pt-2
        grid
        grid-cols-1
        sm:grid-cols-2
        md:gird-cols-3
        lg:gird-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
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
  );
}
