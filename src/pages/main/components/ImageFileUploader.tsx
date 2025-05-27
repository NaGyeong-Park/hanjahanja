import { styled } from "@linaria/react";
import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { colors } from "../../../constants/colors";

const validateFile = (
  file: File,
): { valid: true } | { valid: false; message: string } => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      message: `지원하지 않는 파일 형식입니다: ${file.name}\n지원 형식: JPG, PNG`,
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      message: `파일 크기가 너무 큽니다: ${file.name}\n최대 크기: 10MB`,
    };
  }

  return {
    valid: true,
  };
};

const validateFiles = (files: File[]) => {
  const validationResults = files.map((file) => ({
    file,
    ...validateFile(file),
  }));

  const validFiles = validationResults
    .filter((r) => r.valid)
    .map((r) => r.file);

  const errors = validationResults
    .filter((r) => !r.valid)
    .map((r) => r.message);

  return { errors, validFiles: [...validFiles] };
};

export function ImageFileUploader({
  onFilesChange,
}: {
  onFilesChange: (file: File[]) => void;
}) {
  const [dragover, setDragover] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    setDragover(false);
    const { validFiles, errors } = validateFiles(
      Array.from(event.dataTransfer.files),
    );
    if (errors.length > 0) {
      alert(errors.join("\n"));
    }
    if (validFiles.length > 0) {
      onFilesChange(validFiles);
    }
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const { validFiles, errors } = validateFiles(
      Array.from(event.target.files ?? []),
    );
    if (errors.length > 0) {
      alert(errors.join("\n"));
    }
    if (validFiles.length > 0) {
      onFilesChange(validFiles);
    }
  };

  return (
    <UploadZone
      active={dragover}
      onClick={() => fileInputRef.current?.click()}
      onDragOver={(event) => {
        event.preventDefault();
        setDragover(true);
      }}
      onDragLeave={() => setDragover(false)}
      onDrop={handleDrop}
    >
      <UploadIcon>☁️</UploadIcon>
      <H3>완성된 템플릿을 업로드하세요</H3>
      <P>파일을 드래그하거나 클릭하여 업로드</P>
      <Small>JPG, PNG 파일 지원</Small>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        multiple
        accept=".jpg,.jpeg,.png"
        onChange={handleFileSelect}
      />
    </UploadZone>
  );
}

const UploadZone = styled.div<{ active?: boolean }>`
  border: 2px dashed ${colors.grey01};
  border-radius: 16px;
  padding: 48px;
  text-align: center;
  background: ${colors.grey00};
  transition: all 0.3s ease;
  cursor: pointer;
  margin: 32px 0;

  &:hover {
    border-color: ${colors.pink};
    background: #fff5f5;
  }

  ${(props) =>
    props.active
      ? `
    border-color: ${colors.pink};
    background: #fff5f5;
    transform: scale(1.02);
  `
      : ""}
`;

const UploadIcon = styled.div`
  font-size: 48px;
  color: ${colors.grey01};
  margin-bottom: 16px;
`;

const Small = styled.small`
  display: block;
  color: ${colors.grey02};
  margin-top: 8px;
  font-size: 14px;
`;

const H3 = styled.h3`
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 16px;
  line-height: 1.6;
`;

const P = styled.p`
  font-size: 13;
  padding-top: 8;
`;
