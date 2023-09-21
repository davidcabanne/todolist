import styled, { css } from "styled-components";
import * as col from "../styles/colorPalette";

// STYLES
const Button = styled.button`
  position: relative;
  width: max-content;
  border: none;
  color: white;
  padding: 8px 16px;
  font-weight: 400;
  cursor: pointer;
  border-radius: 16px;
  z-index: 1;
  overflow: hidden;
  background: ${col.callToAction};
  transition: opacity 150ms ease-in-out;
  ${(props) =>
    props.danger &&
    css`
      background: #fb415a;
    `}
`;

export default function ButtonPrimary({
  children,
  innerRef,
  onClick,
  onMouseEnter,
  onMouseLeave,
  type,
  danger,
}) {
  return (
    <Button
      aria-label={children}
      ref={innerRef}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      type={type}
      danger={danger}
    >
      {children}
    </Button>
  );
}
