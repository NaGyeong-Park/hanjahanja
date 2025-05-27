import { styled } from "@linaria/react";
import { CtaButton } from "../../components/CtaButton";
import { ImageFileUploader } from "../../components/ImageFileUploader";
import { colors } from "../../../../constants/colors";
import { useState } from "react";
import { FontTemplate } from "../../../../core/constants";

type TemplateFileKey = keyof typeof FontTemplate | "";

interface TemplateFile {
  id: string;
  key: TemplateFileKey;
  name: string;
  value: File;
}

const TemplateInput: { label: string; key: TemplateFileKey }[] = [
  { label: "초성1", key: FontTemplate.초성1 },
  { label: "초성2", key: FontTemplate.초성2 },
  { label: "중성", key: FontTemplate.중성 },
  { label: "종성", key: FontTemplate.종성 },
  { label: "영어특수문자", key: FontTemplate.영어특수문자 },
];

const templateFileListToRecord = (
  files: TemplateFile[],
): Record<keyof typeof FontTemplate, File> => {
  const templateList = files
    .filter((file) => file.key !== "")
    .map((file) => [file.key, file.value] as const);

  return Object.fromEntries(templateList) as Record<
    keyof typeof FontTemplate,
    File
  >;
};

export function UploadStep({
  onNext,
  onPrev,
}: {
  onNext: (temaplates: Record<keyof typeof FontTemplate, File>) => void;
  onPrev: () => void;
}) {
  const [canNext, setCanNext] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<TemplateFile[]>([]);

  const handleFilesChange = (files: File[]) => {
    const newFiles = files.map((file) => ({
      id: crypto.randomUUID(),
      key: "" as const,
      name: file.name,
      value: file,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleSelectFileKey = ({
    id,
    value,
  }: {
    id: string;
    value: TemplateFileKey;
  }) => {
    if (value !== "" && uploadedFiles.some((file) => file.key === value)) {
      alert("이미 선택된 템플릿입니다. 다른 템플릿을 선택해주세요.");
      setCanNext(false);
      return;
    }

    setUploadedFiles((prev) => {
      const newFiles = prev.map((file) =>
        file.id === id ? { ...file, key: value } : file,
      );

      const canNext =
        new Set(newFiles.filter(({ key }) => key !== "").map(({ key }) => key))
          .size === Object.keys(FontTemplate).length;
      setCanNext(canNext);

      return newFiles;
    });
  };

  const removeFile = (id: string) => {
    const newFiles = uploadedFiles.filter((file) => file.id !== id);
    setUploadedFiles(newFiles);
  };

  const handleNext = () => {
    if (uploadedFiles.some((file) => file.key === "")) {
      alert("모든 템플릿을 선택해주세요.");
      console.error("모든 템플릿을 선택하지 않았습니다.");
      return;
    }
    onNext(templateFileListToRecord(uploadedFiles));
  };

  return (
    <>
      <ImageFileUploader onFilesChange={handleFilesChange} />
      <PreviewGrid>
        {uploadedFiles.length === 0 ? (
          <PreviewPlaceholder>
            업로드된 파일이
            <br />
            여기에 표시됩니다
          </PreviewPlaceholder>
        ) : (
          uploadedFiles.map(({ value: file, id, name, key }) => {
            return (
              <PreviewCard key={id}>
                <div style={{ textAlign: "center" }}>
                  <PrevieImage src={URL.createObjectURL(file)} alt={name} />
                  <P>{file.name}</P>
                  <TemplateSelect
                    value={key}
                    onChange={(event) =>
                      handleSelectFileKey({
                        id,
                        value: event.target.value as TemplateFileKey,
                      })
                    }
                  >
                    <option value="">템플릿 선택</option>
                    {TemplateInput.map((template) => (
                      <option key={template.key} value={template.key}>
                        {template.label}
                      </option>
                    ))}
                  </TemplateSelect>
                </div>
                <DeleteButton onClick={() => removeFile(id)} title="삭제">
                  ×
                </DeleteButton>
              </PreviewCard>
            );
          })
        )}
      </PreviewGrid>
      <BottomWrapper>
        <CtaButton secondary onClick={onPrev}>
          이전
        </CtaButton>
        <CtaButton onClick={handleNext} disabled={!canNext}>
          다음 단계
        </CtaButton>
      </BottomWrapper>
    </>
  );
}

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 32px;
`;

const PreviewCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const PreviewPlaceholder = styled.div`
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  color: ${colors.grey01};
  font-size: 14px;
  line-height: 1.4;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: #fed7d7;
  color: #e53e3e;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TemplateSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 12px;
  background: white;
  color: #4a5568;

  &:focus {
    outline: none;
    border-color: ${colors.pink};
  }
`;

const PrevieImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  margin-bottom: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const BottomWrapper = styled.div`
  text-align: center;
  margin-top: 32px;
  display: flex;
  gap: 16px;
  justify-content: center;
`;

const P = styled.p`
  font-size: 14px;
  margin: 8px 0;
  word-break: break-all;
`;
