"use client";
import React, { useState, useEffect } from "react";
import Loader from "./Loader";

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return <Loader />;

  return <>{children}</>;
};

export default ClientOnly;
