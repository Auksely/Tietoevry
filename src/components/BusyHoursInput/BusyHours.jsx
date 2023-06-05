import React, { useState, useEffect } from "react";
import { getBusyDays } from "../LocalStorage"
import Inputs from "../Inputs/Input";
import './busy-hours-input.scss'
import Button from "../Button/Button";
import { getTask } from "../LocalStorage"
import Table from "../Tables/Tables"
import { holidays } from "../Schedule/holidays";


const BusyHours = () => {

  const storedTask = getTask;

  const deadline = storedTask.deadline;

  const today = new Date();
  const todayDate = today.toLocaleString("default", { year: "numeric" }) + "-" +
    today.toLocaleString("default", { month: "2-digit" }) + "-" +
    today.toLocaleString("default", { day: "2-digit" })

  const [busyData, setBusyData] = useState(
    {
      date: '',
      hours: ''
    })
  let [busy, setBusy] = useState([]);

  useEffect(() => {
    const storedArray = getBusyDays;
    if (storedArray) {
      setBusy(storedArray);
    }
  }, []);

  const onChange = (e) => {
    const { value, name } = e.target;
    setBusyData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {

    if (busyData.date === '' || busyData.hours === '') {
      e.preventDefault();
      return;
    }
    const existingDate = busy.findIndex((obj) => obj.date === busyData.date);
    if (existingDate !== -1) {
      busy[existingDate] = busyData;
    } else {
      busy.push(busyData);
    }
    localStorage.setItem("Busy", JSON.stringify(busy));
  }


  return (
    <>
      <form className="busy-hours-form">
        <div className="busy-hours-form__input-data">
          <div className="busy-hours-form__input">
            <Inputs
              label="Busy date"
              type="date"
              name="date"
              value={busyData.date}
              onChange={onChange}
              min={todayDate}
              disabled="2023-06-05"
              max={deadline}
            />
          </div>
          <div className="busy-hours-form__input">
            <Inputs
              label="Hours of being busy"
              type="number"
              name="hours"
              value={busyData.hours}
              onChange={onChange}
              min={0}
              max={10}
            />
          </div>
          <div className="busy-hours-form__button">
            <Button type="submit" handleClick={handleSubmit}> Add bussy hours</Button>
          </div>
        </div>
        <div className="busy-hours-form__table">
          <Table firstColl="Busy date" secColl="Amount of busy hours" busy={busy} />
        </div>

      </form>
    </>

  )
}

export default BusyHours;
