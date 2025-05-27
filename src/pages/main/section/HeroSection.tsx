import { styled } from "@linaria/react";
import { MAIN_PAGE_START_LINK } from "../../../constants/link";
import { OnTableMediaQuery } from "../../../constants/styles";
import { colors } from "../../../constants/colors";
import { CtaButtonLink } from "../components/CtaButton";

export function HeroSection() {
  return (
    <Container>
      <HeroContainer>
        <div>
          <Title>
            당신만의 손글씨를
            <br />
            폰트로 만들어보세요
          </Title>
          <Description>
            {"간단한 5단계로 개성 넘치는\n .otf 폰트를 생성하세요"}
          </Description>
          <CtaButtonLink href={MAIN_PAGE_START_LINK}>
            <span>🚀</span>
            지금 시작하기
          </CtaButtonLink>
        </div>
        <HeroIllustration>
          <HeroImg src="/hero-img.png" alt="한자한자 최상단 소개 이미지" />
        </HeroIllustration>
      </HeroContainer>
    </Container>

    // <HeroContainer>
    //   <TitleWrapper>
    //     <H2>당신의 손글씨가 폰트로 태어납니다</H2>
    //     <H3>
    //       {
    //         "당신만의 글씨를 모아 \n세상에 하나뿐인 \n한글 글꼴을 만들어 드립니다"
    //       }
    //     </H3>
    //   </TitleWrapper>
    // </HeroContainer>
  );
}

const HeroImg = styled.img`
  flex: 1 1 0;
  width: 100px;
  height: auto;
  border-radius: 10%;
`;

const Container = styled.section`
  background: linear-gradient(135deg, #faf5f0 0%, #ffffff 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b6b' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.1;
  }

  animation: slide-in 0.6s ease;

  @keyframes slide-in {
    from {
      transform: translateY(20px);
      opacity: 0;
    }

    to {
      transform: translateY(0px);
      opacity: 1;
    }
  }
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 64px 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  position: relative;
  z-index: 1;

  ${OnTableMediaQuery} {
    grid-template-columns: 1fr;
    gap: 32px;
    text-align: center;
  }
`;

const Description = styled.h3`
  font-size: 18px;
  color: ${colors.grey02};
  margin-bottom: 32px;
  word-break: keep-all;
  line-height: 1.4;

  ${OnTableMediaQuery} {
    white-space: pre-line;
  }
`;

const HeroIllustration = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  border-radius: 20px;
  position: relative;

  ${OnTableMediaQuery} {
    height: 300px;
  }
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 700;
  color: ${colors.navy};
  margin-bottom: 16px;
  line-height: 1.2;

  ${OnTableMediaQuery} {
    font-size: 32px;
    line-height: 1.6;
  }
`;
