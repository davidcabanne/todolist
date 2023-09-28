import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import * as col from "../styles/colorPalette";

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Li = styled.li`
  position: relative;
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  color: ${col.secondary};
  font-weight: 500;
  background: none;
  padding: 32px;
  border-radius: 20px;
  overflow: hidden;
  z-index: 1;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: none;
    border-radius: 20px;
    border: 2px solid ${col.validation};
    z-index: 2;
    pointer-events: none;
    opacity: 0;
    transition: opacity 300ms ease-in-out;
  }

  &.active {
    &::after {
      opacity: 1;
    }
  }
  &.inactive {
    animation: ${fadeOut} 500ms ease-in-out forwards;
    transition: 300ms ease-in-out;
    transition-property: margin-top;
    transition-delay: 300ms;
  }
`;

const Label = styled.label`
  position: relative;
  font-size: 24px;
  color: ${col.secondary};
  z-index: 2;
  pointer-events: none;
  transition: color 200ms ease-in-out;
`;

const Checkbox = styled.input`
  position: absolute;
  inset: 0;
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${col.white};
    z-index: 0;
  }
`;

const Svg = styled.svg`
  position: relative;
  z-index: 5;
  pointer-events: none;

  fill: ${col.validation};
  filter: grayscale(100%);
  opacity: 0.35;
  transform: scale(1);
  transition: 300ms ease-in-out;
  transition-property: fill, filter, opacity, transform;

  &.active {
    filter: grayscale(0%);
    opacity: 1;
    transform: scale(1.1);
  }

  &.inactive {
    filter: grayscale(100%);
    opacity: 0.35;
    transform: scale(1);
    transition: 0ms ease-in-out;
    transition-property: fill, filter, opacity, transform;
    transition-delay: 10ms;
  }
`;

export const List = ({
  list,
  tempList,
  checkedState,
  resetClasses,
  handleCountRemoveTasks,
  handleCheckedState,
  handleResetClasses,
  handleTempList,
}) => {
  const [itemHeight, setItemHeight] = useState();

  const handleCheck = (event, position) => {
    setItemHeight(event.target.getBoundingClientRect().height + 16);
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    updatedCheckedState.filter((item) => item === true).length >= 2
      ? handleCountRemoveTasks("Remove tasks")
      : handleCountRemoveTasks("Remove a task");

    handleCheckedState(updatedCheckedState);
    handleResetClasses(false);

    const filteredList = tempList.filter((item, index) =>
      item.id !== parseInt(event.target.id)
        ? { id: index, text: item.text }
        : ""
    );
    handleTempList(filteredList);
  };

  const handleAnimation = (index) => {
    let className = "";
    if (checkedState[index] && !resetClasses) {
      className = "active";
    }
    if (checkedState[index] && resetClasses) {
      className = "inactive";
    }
    return className;
  };

  const handleRenderList = (list) => {
    return list.map((item, index) => (
      <Li
        className={handleAnimation(index)}
        style={{
          marginTop:
            checkedState[index] && resetClasses ? `${-itemHeight}px` : "0px",
        }}
        key={item.text}
        id={item.id}
      >
        <Label>{item.text}</Label>
        <Checkbox
          type="checkbox"
          id={item.id}
          name={item.text}
          value={checkedState[index] || false}
          checked={checkedState[index] || false}
          onChange={(event) => handleCheck(event, index)}
        />
        <Svg
          id={item.id}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className={handleAnimation(index)}
        >
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 17l-5-5.299 1.399-1.43 3.574 3.736 6.572-7.007 1.455 1.403-8 8.597z" />
        </Svg>
      </Li>
    ));
  };

  return <Ul>{handleRenderList(list)}</Ul>;
};

export default List;
