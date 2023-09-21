import styled from "styled-components";
import * as col from "../styles/colorPalette";

// STYLES
const Button = styled.button`
  position: relative;
  border: none;
  color: ${col.secondary};
  background: none;
  font-weight: 400;
  cursor: pointer;
  z-index: 1;
  background: none;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    left: 0;
    bottom: 6px;
    background: ${col.secondary};
  }
`;

export default function ButtonSecondary({ children, innerRef, onClick }) {
  return (
    <Button aria-label={children} ref={innerRef} onClick={onClick}>
      {children}
    </Button>
  );
}
