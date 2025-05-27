import { styled } from "@linaria/react";
import { colors } from "../constants/colors";

export function BrushIcon({ size = 32 }: { size?: number }) {
  return (
    <Wrapper
      role="img"
      aria-label="Brush Icon"
      style={{ width: size, height: size, fontSize: size - 8 }}
    >
      ✎
    </Wrapper>
  );
}

const Wrapper = styled.span`
  background: linear-gradient(45deg, ${colors.pink}, #ffd93d);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;
