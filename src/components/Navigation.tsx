import { styled } from "@linaria/react";

export function Navigation() {
	return (
		<Nav>
			<a href="/">
				<Logo src="/logo.png" alt="한자한자 로고" />
			</a>
		</Nav>
	);
}

const Nav = styled.nav`
	margin: auto;
	max-width: 1024px;
	width: 100%;
	height: 60px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 6px;
`;

const Logo = styled.img`
	width: 50px;
	height: 50px;
`;
