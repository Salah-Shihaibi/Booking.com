import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import ToasterProvider from "./components/providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import SearchBar from "./components/search/SearchBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Booking.com",
  description: "A booking.com clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className="w-full">
        <ClientOnly>
          <ToasterProvider />
          <Navbar currentUser={currentUser} />
          <SearchBar />
        </ClientOnly>
        <div className="pb-20 pt-5 px-3 md:px-10">{children}</div>
      </body>
    </html>
  );
}
