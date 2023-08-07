import ClientOnly from "@/app/components/clientOnly";
import CreateListingClient from "./CreateListingClient";

const CreateListingPage = () => {
  return (
    <ClientOnly>
      <CreateListingClient />
    </ClientOnly>
  );
};

export default CreateListingPage;
