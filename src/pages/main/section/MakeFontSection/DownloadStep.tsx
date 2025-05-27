import { styled } from "@linaria/react";
import { colors } from "../../../../constants/colors";
import Txt from "../../../../components/Txt";
import { CtaButton } from "../../components/CtaButton";
import { OnTableMediaQuery } from "../../../../constants/styles";

export function DownloadStep({ onNext }: { onNext: () => void }) {
  const downloadTemplate = () => {
    const link = document.createElement("a");
    link.href = "./손글씨_템플릿.zip";
    link.download = "손글씨_템플릿.zip";
    link.click();
  };

  return (
    <>
      <Wrapper>
        <Card>
          <Txt.H3>1. 템플릿 다운로드</Txt.H3>
          <p>제공된 템플릿에 깔끔하게 손글씨를 작성해주세요</p>
          <DownloadButton onClick={downloadTemplate}>
            <span>⬇</span>
            템플릿 다운로드
          </DownloadButton>
        </Card>
        <Card>
          <Txt.H3>✨ 작성 요령</Txt.H3>
          <InstructionsList>
            <Li>검은 펜으로 또렷하게 작성</Li>
            <Li>칸 안에 맞춰 쓰기</Li>
            <Li>일정한 크기 유지</Li>
            <Li>선명한 사진으로 촬영</Li>
          </InstructionsList>
        </Card>
      </Wrapper>
      <div style={{ textAlign: "center", marginTop: "32px" }}>
        <CtaButton onClick={onNext}>다음 단계</CtaButton>
      </div>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 32px;
  margin-top: 32px;

  & > div {
    flex: 1;
  }

  ${OnTableMediaQuery} {
    flex-direction: column;
    & > div {
      flex: none;
      width: 100%;
    }
  }
`;

const Card = styled.div`
  background: ${colors.grey00};
  border-radius: 16px;
  padding: 32px;
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${colors.pink};
    transform: translateY(-2px);
  }

  H3 {
    color: ${colors.navy};
    font-size: 24px;
    margin-bottom: 16px;
  }

  p {
    color: ${colors.grey02};
    margin-bottom: 24px;
  }
`;

const DownloadButton = styled.button`
  background: ${colors.navy};
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #2c5282;
    transform: scale(1.05);
  }
`;

const InstructionsList = styled.ul`
  list-style: none;

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${colors.grey02};
    margin-bottom: 8px;

    &::before {
      content: "✓";
      color: #81e6d9;
      font-weight: bold;
    }
  }
`;

const Li = styled.li`
  line-height: 1.6;
`;
