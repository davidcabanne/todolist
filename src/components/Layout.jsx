import styled from "styled-components";
import * as col from "../styles/colorPalette";

// STYLES
const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100dvh;
  padding: 128px 0px;
  background: ${col.light};
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 700px;
`;

export default function ButtonPrimary({ children }) {
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
}
