import { styled } from "@linaria/react";
import { BrushIcon } from "./BrushIcon";
import { OnTableMediaQuery } from "../constants/styles";
import { colors } from "../constants/colors";

export function Navigation() {
  return (
    <Nav>
      <Container>
        <StyledAnchor href="/">
          <Logo>
            <BrushIcon />
            한자한자
          </Logo>
        </StyledAnchor>

        <InfoContainer>
          {/* TODO: */}
          {/* <StyledAnchor href="#">
            <BuyMeACoffee>
              <span>☕</span>
              Buy Me a Coffee
            </BuyMeACoffee>
          </StyledAnchor> */}
        </InfoContainer>
      </Container>
    </Nav>
  );
}

const Nav = styled.nav`
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${OnTableMediaQuery} {
    padding: 16px;
  }
`;

const StyledAnchor = styled.a`
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: none;
  }
  &:active {
    color: ${colors.navy};
    transform: scale(0.95);
    transition: transform 0.1s ease-in-out;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
  font-weight: 700;
  color: ${colors.navy};
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
`;

// const EmailIcon = styled(Item)`
//   font-size: 20px;
//   color: #2d3748;
//   background: ${colors.grey00};
//   transform: scale(1.05);
// `;

// const BuyMeACoffee = styled(Item)`
//   background: #ff9f43;
//   color: white;
//   font-weight: 500;
//   :hover {
//     background: #ff8c1a;
//     transform: scale(1.05);
//   }
// `;
