import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/listing/ListingCard";
import { Listing, User } from "@prisma/client";

interface SavedClientProps {
  listings: Listing[];
  currentUser?: User | null;
}

const SavedClient: React.FC<SavedClientProps> = ({ listings, currentUser }) => {
  return (
    <>
      <Heading title="Favorites" subtitle="List of places you favorited!" />
      <div
        className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-4
        max-w-[2520px]
        mt-4
        "
      >
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            currentUser={currentUser}
            price={true}
            date={false}
          />
        ))}
      </div>
    </>
  );
};

export default SavedClient;
