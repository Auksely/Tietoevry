import React from "react";
import { useState, useEffect } from "react";
import Inputs from "../Inputs/Input";
import classNames from "classnames";
import './task.scss'


const Task = () => {

  const [task, setTask] = useState(getTaskValues);


  localStorage.setItem('Task', JSON.stringify(task));

  function getTaskValues() {
    const storedValues = localStorage.getItem('Task');
    if (!storedValues)
      return {
        taskName: '',
        deadline: '',
        hoursNeeded: '',
      };
    return JSON.parse(storedValues);
  }

  useEffect(() => {
    localStorage.setItem('Task', JSON.stringify(task));
  }, [task]);

  const onChange = (e) => {
    const { value, name } = e.target;
    setTask((state) => ({
      ...state,
      [name]: value,
    }));
    localStorage.setItem('Task', JSON.stringify(task));
  };

  const today = new Date();
  const todayDate = today.toLocaleString("default", { year: "numeric" }) + "-" +
    today.toLocaleString("default", { month: "2-digit" }) + "-" +
    today.toLocaleString("default", { day: "2-digit" })


  return (
    <>
    <form className="task-form">
    <div className="task-form__input">
      <Inputs
        colored
        label="Task"
        placeholder={"Type in task name"}
        type="text"
        name="taskName"
        value={task.taskName}
        onChange={onChange}
      />
  </div>

  <div className="task-form__input">
      <Inputs
        colored
        label="Task deadline"
        type="date"
        name="deadline"
        value={task.deadline}
        onChange={onChange}
        min={todayDate}
        required
      />
      </div>

      <div className="task-form__input">
      <Inputs
        colored
        label="Hours needed for a task"
        type='number'
        name="hoursNeeded"
        min='0'
        max='5000'
        value={task.hoursNeeded}
        onChange={onChange}
        required
      />
      </div>
    </form>
    <hr className="task-form__mark"/>
    </>
  )
}

export default Task;