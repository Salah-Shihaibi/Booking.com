import ClientOnly from "@/app/components/ClientOnly";
import CreateListingClient from "./CreateListingClient";

const CreateListingPage = () => {
  return (
    <ClientOnly>
      <CreateListingClient />
    </ClientOnly>
  );
};

export default CreateListingPage;
