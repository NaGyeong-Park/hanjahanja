import { useRef, useState } from "react";
import { styled } from "@linaria/react";
import { Font, parse } from "opentype.js";
import { colors } from "../../../../constants/colors";
import FontWorker from "../../../../workers/font?worker";
import { FontWorkerMessage, FontWorkerPayload } from "../../../../types/worker";
import { DownloadStep } from "./DownloadStep";
import { UploadStep } from "./UploadStep";
import { FontTemplate } from "../../../../core/constants";
import { GenerateFontStep } from "./GenerateFontStep";
import { LoadingStep } from "./LoadingStep";
import { ResultStep } from "./ResultStep";

const TOTAL_STEPS = 5;

export default function MakeFontSecton() {
  const [currentStep, setCurrentStep] = useState(1);
  const [templates, setTemplates] =
    useState<Record<keyof typeof FontTemplate, File>>();
  const fontRef = useRef<Font>(null);

  const generateFont = async () => {
    const worker = new FontWorker();

    if (!templates) {
      alert("템플릿 파일을 업로드해주세요.");
      setCurrentStep(2);
      return;
    }

    const payload: FontWorkerPayload = {
      초성1: await createImageBitmap(templates.초성1),
      초성2: await createImageBitmap(templates.초성2),
      중성: await createImageBitmap(templates.중성),
      종성: await createImageBitmap(templates.종성),
      영어특수문자: await createImageBitmap(templates.영어특수문자),
    };

    worker.postMessage(payload);

    worker.onmessage = (event: MessageEvent<FontWorkerMessage>) => {
      const message = event.data;
      if (message.type === "font") {
        if (message.success) {
          const font = parse(message.arrayBuffer);
          fontRef.current = font;
          setCurrentStep(5);
        } else {
          console.error(message.errorMessage);
          alert(
            "다운로드에 실패하였습니다. 다시 시도하거나 개발자에게 문의해주세요.",
          );
          setCurrentStep(3);
        }
      }
      worker.terminate();
    };

    worker.onerror = (e) => {
      console.error("Worker error:", e);
      alert(
        "다운로드에 실패하였습니다. 다시 시도하거나 개발자에게 문의해주세요.",
      );
      setCurrentStep(3);
      worker.terminate();
    };
  };

  return (
    <StepperSection id="stepper">
      <StepperContainer>
        <Title>폰트 생성 과정</Title>
        <StepIndicator total={TOTAL_STEPS} current={currentStep} />
        <StepContent active={currentStep === 1}>
          <DownloadStep onNext={() => setCurrentStep(2)} />
        </StepContent>
        <StepContent active={currentStep === 2}>
          <UploadStep
            onNext={(templates) => {
              setTemplates(templates);
              setCurrentStep(3);
            }}
            onPrev={() => setCurrentStep(1)}
          />
        </StepContent>
        <StepContent active={currentStep === 3}>
          <GenerateFontStep
            onNext={async () => {
              setCurrentStep(4);
              generateFont();
            }}
            onPrev={() => setCurrentStep(2)}
          />
        </StepContent>
        <StepContent active={currentStep === 4}>
          <LoadingStep />
        </StepContent>
        <StepContent active={currentStep === 5}>
          {fontRef.current !== null && <ResultStep font={fontRef.current} />}
        </StepContent>
      </StepperContainer>
    </StepperSection>
  );
}

const Title = styled.h2`
  text-align: center;
  margin-bottom: 32px;
  color: #1a365d;
  font-size: 24;
  font-weight: 700;
`;

const StepperSection = styled.section`
  scroll-margin-top: 128px;
  max-width: 1200px;
  margin: 64px auto;
  padding: 0 32px;
`;

const StepperContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 48px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
`;

const ProgressIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: #e2e8f0;
    z-index: 1;
  }
`;

const StepCircle = styled.div<{ active?: boolean; completed?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) =>
    props.active ? colors.pink : props.completed ? "#81e6d9" : "#e2e8f0"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: ${(props) => (props.active || props.completed ? "white" : "#718096")};
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
`;

const StepContent = styled.div<{ active?: boolean }>`
  display: ${(props) => (props.active ? "block" : "none")};
`;

function StepIndicator({ total, current }: { total: number; current: number }) {
  return (
    <ProgressIndicator>
      {new Array(total).fill(0).map((_, index) => {
        const step = index + 1;
        return (
          <StepCircle
            key={index + 1}
            active={step === current}
            completed={step < current}
          >
            {step}
          </StepCircle>
        );
      })}
    </ProgressIndicator>
  );
}
