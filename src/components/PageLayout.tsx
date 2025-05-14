import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";
import { styled } from "@linaria/react";

export function PageLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<Navigation />
			<Main>{children}</Main>
			<Footer />
		</>
	);
}

const Main = styled.main`
	margin: auto;
	max-width: 1024px;
`;
