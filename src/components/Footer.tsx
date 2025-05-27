import { styled } from "@linaria/react";
import { Icon } from "./icons";
import { colors } from "../constants/colors";

export function Footer() {
  return (
    <Container>
      <Wrapper>
        <div>
          <Name>한자한자</Name>
          <Description>개성있는 손글씨 폰트를 쉽게 만들어보세요</Description>
          <SocialLinks>
            <IconAnchor
              href="mailto:ngp.july@gmail.com"
              aria-label="Email Link Icon"
            >
              📧
            </IconAnchor>
            <IconAnchor
              href="https://github.com/NaGyeong-Park"
              aria-label="GitHub Link Icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon.Github size={16} />
            </IconAnchor>
            <IconAnchor
              href="https://www.linkedin.com/in/nagyeong-park"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Link Icon"
            >
              <Icon.Linkedin size={16} />
            </IconAnchor>
          </SocialLinks>
        </div>
        <div></div>
      </Wrapper>
    </Container>
  );
}

const Container = styled.footer`
  background: #2d3748;
  color: ${colors.grey01};
  padding: 60px 0;
  margin-top: 64px;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;
`;

const Name = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.grey00};
  margin-bottom: 8px;
`;

const Description = styled.p`
  color: ${colors.grey01};
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  x & a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: white;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  & a:hover {
  }
`;

const IconAnchor = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
    transform: scale(1.1);
  }
`;
