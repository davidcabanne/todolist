import React, { useState, useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import * as col from "../styles/colorPalette";

import { Label } from "./Typefaces";
import ButtonPrimary from "./ButtonPrimary";

const Container = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  opacity: 0;
  pointer-events: none;
  transition: opacity 300ms ease-in-out;
  transition-delay: 150ms;
  backdrop-filter: blur(16px);

  &.active {
    opacity: 1;
    pointer-events: auto;
  }
`;

const Form = styled.form`
  position: relative;
  width: 500px;
  background: ${col.white};
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 32px 32px 32px rgba(0, 0, 0, 0.15);
  transform: translateY(32px);
  transition: 300ms ease-in-out;
  transition-property: opacity, transform;

  &.active {
    opacity: 1;
    transform: translateY(0px);
    transition-delay: 250ms;
  }
`;

const Pannel = styled.div`
  display: flex;
  gap: 16px;

  ${(props) =>
    props.column &&
    css`
      flex-direction: column;
      gap: 8px;
    `}
`;

const Input = styled.input`
  padding: 16px;
  border: 2px solid transparent;
  border-radius: 4px;
  color: ${col.secondary};
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
  background: ${col.light};
  transition: border 50ms ease-in-out;

  &.active {
    border: 2px solid #fb415a;
    background: #f4e6e8;
  }
`;

const bounce = keyframes`
  0% {
    transform: translateX(0px);
    timing-function: ease-in;
  }
  37% {
    transform: translateX(5px);
    timing-function: ease-out;
  }
  55% {
    transform: translateX(-5px);
    timing-function: ease-in;
  }
  73% {
    transform: translateX(4px);
    timing-function: ease-out;
  }
  82% {
    transform: translateX(-4px);
    timing-function: ease-in;
  }
  91% {
    transform: translateX(2px);
    timing-function: ease-out;
  }
  96% {
    transform: translateX(-2px);
    timing-function: ease-in;
  }
  100% {
    transform: translateX(0px);
    timing-function: ease-in;
  }
`;

const ErrorSpan = styled.span`
  color: #fb415a;
  opacity: 0;
  transition: 150ms ease-in-out;
  transition-property: opacity;

  &.active {
    opacity: 1;
    animation-name: ${bounce};
    animation-duration: 0.5s;
    animation-delay: 0.25s;
  }
`;

export default function Modal({
  toggleModal,
  addToList,
  handleCloseModal,
  handleToggleError,
  toggleError,
}) {
  const inputRef = useRef(null);
  const [value, setValue] = useState("");

  const handleSubmit = (event, value) => {
    if (!value) {
      handleToggleError(true);
      return;
    }
    handleToggleError(false);
    addToList(event, value);
    inputRef.current.value = "";
  };

  return (
    <Container className={toggleModal ? "active" : ""}>
      <Form
        onSubmit={(event) => handleSubmit(event, value)}
        className={toggleModal ? "active" : ""}
        action="#"
      >
        <Label>Submit a new task</Label>
        <Pannel column={+true}>
          <Input
            type="text"
            id="taskForm"
            name="taskForm"
            placeholder="Write a new task"
            onChange={(event) => setValue(event.target.value)}
            ref={inputRef}
            className={
              value === "" && toggleError && toggleModal ? "active" : ""
            }
          />
          <ErrorSpan
            className={
              value === "" && toggleError && toggleModal ? "active" : ""
            }
          >
            You can't submit an empty value
          </ErrorSpan>
        </Pannel>
        <Pannel>
          <ButtonPrimary type="submit">Submit Task</ButtonPrimary>
          <ButtonPrimary onClick={handleCloseModal} danger={+true}>
            Cancel
          </ButtonPrimary>
        </Pannel>
      </Form>
    </Container>
  );
}
