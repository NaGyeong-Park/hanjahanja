import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
