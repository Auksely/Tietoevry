import BusyHours from "../BusyHoursInput/BusyHours"
import Schedule from "../Schedule/ScheduleCounter"
import Task from "../TaskInput/Task"
import "./main.scss"

const Main = () => (
  <div className="main">
    <Task />
    <hr className="main__mark"/>
    <BusyHours />
    <hr className="main__mark"/>
    <Schedule />
  </div>
)

export default Main