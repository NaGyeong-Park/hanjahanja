import { styled } from "@linaria/react";
import Txt from "../../../../components/Txt";
import { colors } from "../../../../constants/colors";
import { CtaButton } from "../../components/CtaButton";

export function GenerateFontStep({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <>
      <GenerateSection>
        <Txt.H3 style={{ marginBottom: "32px" }}>폰트 생성 준비 완료!</Txt.H3>
        <p style={{ marginBottom: "32px", color: "#718096" }}>
          업로드된 템플릿을 바탕으로 폰트를 생성합니다.
        </p>
        <GenerateButton onClick={onNext}>
          <span>🪄</span>
          폰트 만들기
        </GenerateButton>
      </GenerateSection>

      <div style={{ textAlign: "center", marginTop: "32px" }}>
        <CtaButton secondary onClick={onPrev}>
          이전
        </CtaButton>
      </div>
    </>
  );
}

const GenerateSection = styled.div`
  text-align: center;
  margin: 48px 0;
`;

const GenerateButton = styled.button`
  background: linear-gradient(135deg, ${colors.pink}, #ff8e8e);
  color: white;
  padding: 16px 32px;
  border: none;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 200px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
  }
`;
