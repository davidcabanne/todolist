import React, { useRef } from "react";
import styled from "styled-components";

import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";

// STYLES
const Container = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
`;

export default function CallToActionPannel({
  countRemoveTasks,
  handleToggleModal,
  handleSelection,
  handleRemoveFromList,
}) {
  const buttonAddRef = useRef(null);
  const buttonRemoveRef = useRef(null);
  const buttonCheckAllRef = useRef(null);
  const buttonUncheckAllRef = useRef(null);

  const handleHover = (ref, value) => {
    ref === buttonAddRef && value
      ? (buttonRemoveRef.current.style.opacity = "0.75")
      : (buttonRemoveRef.current.style.opacity = "1");
    ref === buttonRemoveRef && value
      ? (buttonAddRef.current.style.opacity = "0.75")
      : (buttonAddRef.current.style.opacity = "1");
  };
  return (
    <Container>
      <ButtonPrimary
        innerRef={buttonAddRef}
        onClick={() => handleToggleModal()}
        onMouseEnter={() => handleHover(buttonAddRef, true)}
        onMouseLeave={() => handleHover(buttonAddRef, false)}
      >
        Add a task
      </ButtonPrimary>
      <ButtonPrimary
        innerRef={buttonRemoveRef}
        onClick={() => handleRemoveFromList()}
        onMouseEnter={() => handleHover(buttonRemoveRef, true)}
        onMouseLeave={() => handleHover(buttonRemoveRef, false)}
      >
        {countRemoveTasks}
      </ButtonPrimary>
      <ButtonSecondary
        innerRef={buttonCheckAllRef}
        onClick={() => handleSelection(true)}
      >
        Check all tasks
      </ButtonSecondary>
      <ButtonSecondary
        innerRef={buttonUncheckAllRef}
        onClick={() => handleSelection(false)}
      >
        Uncheck all tasks
      </ButtonSecondary>
    </Container>
  );
}
