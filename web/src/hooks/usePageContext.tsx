/* unused */
import { createContext, useContext } from "react";
import { Page } from "../@types/types";

const PageContext = createContext<Page | null>(null);

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePageContext must be used within a PageContextProvider");
  }
  return context;
};

export const PageContextProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: Page | null;
}) => {
  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};
