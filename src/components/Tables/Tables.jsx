import React from "react";
import './tables.scss';

const Table = ({ firstColl, secColl, thirtdColl, makeSchedule, busy, schedule }) => {

    return (
        <div className="table-container">
        <table className="table">
            <thead>
                <tr className="table__rows">
                    <th className="table__names">{firstColl}</th>
                    <th className="table__names">{secColl}</th>
                    {makeSchedule &&
                        <th className="table__names">{thirtdColl}</th>
                    }
                </tr>
            </thead>
            <tbody>
                {makeSchedule ? (
                    <>
                        {schedule.map(({ date, freeTime, studyTime }) => (
                            <tr className="table__data" key={date}>
                                <td className="table__data">{date}</td>
                                <td className="table__data">{freeTime}</td>
                                <td className="table__data">{studyTime}</td>
                            </tr>
                        ))}
                    </>) :
                    (
                        <>
                            {busy.map(({ date, hours }) => (
                                <tr className="table__rows" key={date}>
                                    <td className="table__data">{date}</td>
                                    <td className="table__data">{hours}</td>
                                </tr>
                            ))}
                        </>
                    )
                }
            </tbody>
        </table>
        </div>
    )
}

export default Table