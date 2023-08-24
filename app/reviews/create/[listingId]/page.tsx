import ClientOnly from "@/app/components/ClientOnly";
import CreateReview from "./CreateReview";

interface IParams {
  listingId: number;
}

const page = ({ params }: { params: IParams }) => {
  return (
    <ClientOnly>
      <CreateReview listingId={params.listingId} />
    </ClientOnly>
  );
};

export default page;
