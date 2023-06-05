import React, { useState } from "react";
import { getBusyDays, getTask } from "../LocalStorage"
import Button from "../Button/Button";
import Table from "../Tables/Tables";
import "./schedule.scss"
import {holidays} from "./holidays"


const Schedule = () => {

  let busyDays = getBusyDays;
  const storedTask = getTask;

  const deadline = storedTask.deadline;
  const deadlineDate = new Date(deadline)

  let hoursNeeded = storedTask.hoursNeeded;

  const today = new Date();
  
  function isHoliday(date) {
    return holidays.some(holiday => isSameDay(date, holiday));
  }
  
  function isSameDay(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
  function getDates(today, deadlineDate) {

    let dates = [];
    const currentDate = new Date(today);
    while (currentDate <= deadlineDate) {  
      if (!isHoliday(currentDate)) {
        dates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }

  const allDatesArrYYmmDD = getDates(today, deadlineDate).map(date => (
    date.toLocaleString("default", { year: "numeric" }) + "-" +
    date.toLocaleString("default", { month: "2-digit" }) + "-" +
    date.toLocaleString("default", { day: "2-digit" })
  )
  )

  const objectArray = allDatesArrYYmmDD.map(str => {
    return {
      date: str,
      hours: 24,
    };
  });

  const hoursOfSleep = 8;
  const [results, setResults] = useState([]);
  const [showSecondButton, setShowSecondButton] = useState(false);
  const [showFirstButton, setShowFirstButton] = useState(true);
  const [insufficientTime, setInsufficientTime] = useState(false);


  let dates = [];

  function calculateStudySchedule() {
    objectArray.forEach(schedule => {
      const { date, hours } = schedule;

      const busyDay = busyDays.find(busy => busy.date === date);
      const busyHours = busyDay ? busyDay.hours : 0;
      const freeTime = hours - busyHours - hoursOfSleep;
      let studyTime = 0;

      const result = {
        date,
        freeTime,
        studyTime,
      };
      dates.push(result);
      setResults(dates);
    })
    setShowSecondButton(true);
    setShowFirstButton(false)
  };


  let sortCalendar = []
  const [sortedCalendar, setsortedCalendar] = useState([]);

  function sortAndCount() {

    while (hoursNeeded > 0) {
      sortCalendar = results.sort((a, b) => b.freeTime - a.freeTime);
      const maxFreeTimeObj = sortCalendar[0];

      if (maxFreeTimeObj.freeTime > 0) {
        maxFreeTimeObj.freeTime--
        maxFreeTimeObj.studyTime++
      }
      else {
        setInsufficientTime(true)
        break
      }
      hoursNeeded--;
    }
    setsortedCalendar(sortCalendar);
    setShowSecondButton(false);
    setShowFirstButton(true);
    return sortedCalendar
  }

  sortedCalendar.sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleClick = (e) => {
    e.preventDefault()
    calculateStudySchedule();
  }

  const handleClick2 = (e) => {
    e.preventDefault()
    sortAndCount();
  }

  return (
    <>
      <div className="schedule-container">
        <div className="schedule__buttons">
          {showFirstButton && (
            <Button type="submit" handleClick={handleClick}>Calculate</Button>
          )}
          {showSecondButton && (
            <Button type="submit" handleClick={handleClick2}>Make a schedule</Button>
          )}
        </div>
        <div className="schedule">
          {insufficientTime ? (<p className="schedule__message">Not enough free time to fulfill the study hours requirement.</p>) :
            <Table firstColl="Date" secColl="Free time (hours)" thirtdColl="Study time (hours)" makeSchedule schedule={sortedCalendar} />
          }
        </div>
      </div>
    </>

  )
}
export default Schedule;