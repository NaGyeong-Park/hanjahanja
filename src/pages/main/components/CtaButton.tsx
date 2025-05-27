import { styled } from "@linaria/react";
import { colors } from "../../../constants/colors";
import { ButtonHTMLAttributes } from "react";

export const CtaButtonLink = styled.a<{ secondary?: boolean }>`
  text-decoration: none;
  background: ${(props) =>
    props.secondary
      ? "#1a365d"
      : `linear-gradient(135deg, ${colors.pink}, #ff8e8e)`};
  color: white;
  padding: 16px 32px;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
  }

  &:disabled {
    background: ${colors.grey01};
    color: ${colors.grey02};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export function CtaButton(
  props: ButtonHTMLAttributes<HTMLButtonElement> & {
    secondary?: boolean;
  },
) {
  return <CtaButtonLink as="button" {...(props as any)} />;
}
