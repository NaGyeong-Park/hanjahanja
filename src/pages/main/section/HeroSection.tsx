import { styled } from "@linaria/react";
import { colors } from "../../../constants/colors";

export function HeroSection() {
  return (
    <HeroContainer>
      <TitleWrapper>
        <H2>당신의 손글씨가 폰트로 태어납니다</H2>
        <H3>
          {
            "당신만의 글씨를 모아 \n세상에 하나뿐인 \n한글 글꼴을 만들어 드립니다"
          }
        </H3>
      </TitleWrapper>
      <HeroImg src="/hero-img.png" alt="한자한자 최상단 소개 이미지" />
    </HeroContainer>
  );
}

const HeroContainer = styled.div`
  margin: 80px 0;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 80px;
`;

const TitleWrapper = styled.div``;

const H2 = styled.h2`
  font-weight: 600;
  color: ${colors.brown};
  font-size: 24px;
  margin-bottom: 8px;
`;

const H3 = styled.h3`
  font-weight: bold;
  color: ${colors.darkBrown};
  line-height: 1.4;
  font-size: 32px;
  word-break: keep-all;
  white-space: pre-line;
`;

const HeroImg = styled.img`
  flex: 1 1 0;
  width: 100px;
  height: auto;
  border-radius: 10%;
`;
