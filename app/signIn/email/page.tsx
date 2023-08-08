import ClientOnly from "@/app/components/ClientOnly";
import EmailClient from "./EmailClient";

const EmailPage = () => {
  return (
    <ClientOnly>
      <EmailClient />
    </ClientOnly>
  );
};

export default EmailPage;
