import React, { useState, useRef } from "react";
import styled from "styled-components";
import * as col from "./styles/colorPalette";

import { Label } from "./components/Typefaces";
import ButtonPrimary from "./components/ButtonPrimary";

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
`;

const Input = styled.input`
  padding: 16px;
  border: none;
  border-radius: 4px;
  color: ${col.secondary};
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
  background: ${col.light};
`;

export default function Modal({ toggleModal, addToList, handleCloseModal }) {
  const inputRef = useRef(null);
  const [value, setValue] = useState("");

  const handleSubmit = (event, value) => {
    if (!value) {
      return;
    }
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
        <Input
          type="text"
          id="taskForm"
          name="taskForm"
          placeholder="Write a new task"
          onChange={(event) => setValue(event.target.value)}
          ref={inputRef}
        />
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
