import { styled } from "@linaria/react";
import { colors } from "../../../../constants/colors";
import { Font } from "opentype.js";
import { CtaButtonLink } from "../../components/CtaButton";

export function ResultStep({ font }: { font: Font }) {
  const downloadFont = () => {
    alert("폰트를 다운로드 할게요. 파일이 커서 오래걸릴 수 있어요.");
    font.download();
  };

  return (
    <>
      <SuccessMessage>
        <span>✅</span>
        폰트 생성 완료!
      </SuccessMessage>

      <DownloadSection>
        <FontDownloadButton onClick={downloadFont}>
          <span>⬇</span>
          폰트 다운로드 (.otf)
        </FontDownloadButton>
        <FileInfo>
          <p>
            <strong>파일명:</strong> MyHandwriting.otf
          </p>
          <p>
            <strong>생성일:</strong> {new Date().toLocaleDateString()}
          </p>
        </FileInfo>
      </DownloadSection>

      {/* TODO: preview */}
      {/* <PreviewSection>
        <H4>폰트 미리보기</H4>
        <PreviewInput
          type="text"
          placeholder="여기에 텍스트를 입력하여 폰트를 미리보세요"
          onChange={(event) => updatePreview(event.target.value)}
        />
        <PreviewText>{previewText}</PreviewText>
      </PreviewSection> */}

      <div style={{ textAlign: "center", marginTop: "32px" }}>
        <CtaButtonLink href={""} style={{ background: "#81e6d9" }}>
          새로 만들기
        </CtaButtonLink>
      </div>
    </>
  );
}

const DownloadSection = styled.div`
  background: ${colors.grey00};
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 32px;
`;

const FontDownloadButton = styled.button`
  background: ${colors.navy};
  color: white;
  padding: 16px 32px;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
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

const FileInfo = styled.div`
  margin-top: 16px;
  color: ${colors.grey02};
  font-size: 14px;
  line-height: 1.6;
`;

// const PreviewSection = styled.div`
//   margin-top: 32px;
// `;

// const PreviewInput = styled.input`
//   width: 100%;
//   padding: 16px;
//   border: 2px solid #e2e8f0;
//   border-radius: 12px;
//   font-size: 18px;
//   margin-bottom: 16px;
//   transition: border-color 0.3s ease;

//   &:focus {
//     outline: none;
//     border-color: ${colors.pink};
//   }
// `;

// const PreviewText = styled.div`
//   background: white;
//   border: 2px solid #e2e8f0;
//   border-radius: 12px;
//   padding: 32px;
//   font-size: 32px;
//   text-align: center;
//   min-height: 100px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #38a169;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 32px;
`;

// const H4 = styled.h4`
//   margin-bottom: 16px;
//   font-weight: 700;
//   font-size: 20;
//   padding-top: 30;
// `;
