import ClientOnly from "@/app/components/clientOnly";
import EmailClient from "./EmailClient";

const EmailPage = () => {
  return (
    <ClientOnly>
      <EmailClient />
    </ClientOnly>
  );
};

export default EmailPage;
