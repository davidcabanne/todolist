import styled from "styled-components";
import * as col from "../styles/colorPalette";

export const H1 = styled.h1`
  font-size: 64px;
  text-align: left;
  color: ${col.dark};
  font-weight: 600;
  margin-bottom: 32px;
`;

export const H2 = styled.h2`
  color: ${col.secondary};
  font-size: 24px;
  font-weight: 400;
  line-height: 1.4;
  margin-bottom: 64px;
`;

export const Label = styled.label`
  color: ${col.secondary};
  font-size: 24px;
  font-weight: 400;
  line-height: 1.4;
`;
