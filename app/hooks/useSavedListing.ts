import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

interface IUseSavedListing {
  listingId: number;
  currentUser: User | null;
}

const useSavedListing = ({ listingId, currentUser }: IUseSavedListing) => {
  const router = useRouter();
  const hasSavedListing = useMemo(() => {
    const list = currentUser?.savedIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleSavedListing = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return router.push("signIn/email");
      }

      try {
        let request;
        if (hasSavedListing) {
          request = () => axios.delete(`/api/saveListing/${listingId}`);
        } else {
          request = () => axios.post(`/api/saveListing/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong.");
      }
    },
    [currentUser, hasSavedListing, listingId, router]
  );

  return {
    hasSavedListing,
    toggleSavedListing,
  };
};

export default useSavedListing;
