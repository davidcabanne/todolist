import React, { useState } from "react";
import AutoHeight from "./lib/AutoHeight";

import Layout from "./components/Layout";
import { H1, H2 } from "./components/Typefaces";
import List from "./components/List";
import CallToActionPannel from "./components/CallToActionPannel";
import Modal from "./Modal";

const data = [
  { text: `React tutorial` },
  { text: "Make Music" },
  { text: "Cook italian dish" },
  { text: "Learn the flute" },
];

function App() {
  const [list, setList] = useState(
    data.map((item, index) => {
      const { text } = item;
      return {
        id: index,
        text: text,
      };
    })
  );
  const [tempList, setTempList] = useState(list);
  const [toggleModal, setToggleModal] = useState(false);
  const [checkedState, setCheckedState] = useState(
    new Array(list.length).fill(false)
  );
  const [resetClasses, setResetClasses] = useState(false);
  const [countRemoveTasks, setCountRemoveTasks] = useState("Remove a task");
  const [toggleError, setToggleError] = useState(false);

  const handleSelection = (value) => {
    if (value) {
      setCheckedState(new Array(list.length).fill(true));
      setTempList([]);
      setResetClasses(false);
    } else {
      setCheckedState(new Array(list.length).fill(false));
      setTempList(list);
      setList(list);
    }
  };

  const addToList = (event, value) => {
    event.preventDefault();
    setList([...list, { id: list.length, text: `${value}` }]);
    setTempList([...list, { id: list.length, text: `${value}` }]);
    setCheckedState(new Array(list.length + 1).fill(false));
    setToggleModal(false);
  };

  const handleRemoveFromList = () => {
    setResetClasses(true);
    setTimeout(() => {
      setList(tempList);
      setCheckedState(new Array(tempList.length).fill(false));
    }, 1000);
  };

  const handleToggleModal = () => {
    setCheckedState(new Array(tempList.length).fill(false));
    setToggleModal(true);
    setToggleError(false);
  };

  const handleCloseModal = () => {
    setToggleModal(false);
    setToggleError(false);
  };

  // Handle cascading functions & state props to <List /> component
  // => one source of truth located at the higher scope (app.jsx), and used in multiple components
  const handleCountRemoveTasks = (value) => {
    setCountRemoveTasks(value);
  };

  const handleCheckedState = (value) => {
    setCheckedState(value);
  };

  const handleResetClasses = (value) => {
    setResetClasses(value);
  };

  const handleTempList = (value) => {
    setTempList(value);
  };

  const handleToggleError = (value) => {
    setToggleError(value);
  };

  return (
    <Layout>
      <H1>Todo list.</H1>
      <H2>
        Gagnez en concentration, en organisation et en sérénité avec Todolist.
        La 1ère application de gestion de tâches et de to do list.
      </H2>
      <AutoHeight duration={300}>
        <List
          list={list}
          tempList={tempList}
          checkedState={checkedState}
          resetClasses={resetClasses}
          handleCountRemoveTasks={handleCountRemoveTasks}
          handleCheckedState={handleCheckedState}
          handleResetClasses={handleResetClasses}
          handleTempList={handleTempList}
        />
      </AutoHeight>
      <CallToActionPannel
        countRemoveTasks={countRemoveTasks}
        handleToggleModal={handleToggleModal}
        handleSelection={handleSelection}
        handleRemoveFromList={handleRemoveFromList}
      />
      <Modal
        toggleModal={toggleModal}
        addToList={addToList}
        handleCloseModal={handleCloseModal}
        handleToggleError={handleToggleError}
        toggleError={toggleError}
      />
    </Layout>
  );
}

export default App;
