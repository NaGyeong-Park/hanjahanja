import { styled } from "@linaria/react";
import { colors } from "../constants/colors";

export function Footer() {
	return (
		<Container>
			<Wrapper>
				<Link href="mailto:ngp.july@gmail.com">Email</Link>
				<Link href="https://www.linkedin.com/in/nagyeong-park">LinkedIn</Link>
				<Link href="https://github.com/NaGyeong-Park">Github</Link>
			</Wrapper>
		</Container>
	);
}

const Container = styled.footer`
	font-size: 12px;
	color: ${colors.darkBrown};
	text-align: center;
	margin: 160px 0 60px;
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	gap: 8px;
`;

const Link = styled.a`
	color: ${colors.darkBrown};
`;
