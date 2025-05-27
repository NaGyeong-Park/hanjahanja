import { styled } from "@linaria/react";
import Txt from "../../../../components/Txt";

export function LoadingStep() {
  return (
    <div style={{ textAlign: "center" }}>
      <Txt.H3 style={{ marginBottom: "32px" }}>
        폰트를 생성하고 있습니다...
      </Txt.H3>
      <LoadingAnimation>⚙️</LoadingAnimation>
      {/* TODO: show progress percent by worker's message */}
      {/* <ProgressBar>
        <ProgressFill percent={percent} />
      </ProgressBar> */}
      <p style={{ color: "#718096", marginTop: "16px" }}>약 1-2분 소요됩니다</p>
    </div>
  );
}

const LoadingAnimation = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

// const ProgressBar = styled.div`
//   width: 200px;
//   height: 8px;
//   background: #e2e8f0;
//   border-radius: 4px;
//   overflow: hidden;
//   margin: 16px auto;
// `;

// const ProgressFill = styled.div<{ percent?: boolean }>`
//   height: 100%;
//   background: linear-gradient(90deg, ${colors.pink}, #ff8e8e);
//   width: ${({percent}) => (percent ? `${percent}%` : "0%")};
//   transition: width 0.3s ease;
// `;
