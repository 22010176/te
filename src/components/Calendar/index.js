import React, { useState, useContext, createContext, useEffect } from 'react'

import 'reset-css'
import './styles.scss'

import { GetDayInMonth } from '../../Utilities'

function DayElem({ day = 0, now, active }) { return <div className={[day ? 'calendar-day' : 'calendar-day-empty', now && 'cur-day', active && 'day-active'].filter(i => i).join(' ')} day={day || undefined}>{day || ''}</div> }

function CalendarDay({ context }) {
    const [date, setDate] = useContext(context)

    const cur = new Date()
    const firstDay = new Date(date.getFullYear(), date.getMonth())
    let count = 0;

    const days = GetDayInMonth(firstDay.getMonth() + 1, firstDay.getFullYear())
    const remaining = (firstDay.getDay() + days) % 7

    function onClick(e) {
        if (!e.target.classList.contains("calendar-day")) return
        setDate(new Date(date.getFullYear(), date.getMonth(), +e.target.getAttribute('day')))
    }

    return (
        <div className="calendar-dates" onClick={onClick}>
            {Array(firstDay.getDay()).fill().map(() => <DayElem key={`day-empty-${count++}`} />)}
            {Array(days).fill().map((_, i) => <DayElem key={`day-${i + 1}`} day={i + 1} now={i + 1 == cur.getDate() && cur.getMonth() == date.getMonth() && cur.getFullYear() == date.getFullYear()} active={i + 1 == date.getDate()} />)}
            {remaining ? Array(7 - remaining).fill().map(() => <DayElem key={`day-empty-${count++}`} />) : null}
        </div>
    )
}

export default function DateCalendar({ date: _date, onChange }) {
    const CalendarContext = createContext()
    const [date, setDate] = useState(_date || new Date())

    if (!date) return

    function _onClick(e) {
        if (!e.target.classList.contains('doi-thang')) return
        setDate(cur => new Date(cur.getFullYear(), cur.getMonth() + (+e.target.getAttribute('data-thang-thaydoi'))))
    }

    useEffect(function () {
        if (typeof onChange == 'function') onChange(date)
    }, [date])

    return (
        <CalendarContext.Provider value={[date, setDate]}>
            <div className="date-calendar" onClick={_onClick}>
                <div className="calendar-month">
                    <button className="btn doi-thang" data-thang-thaydoi="-1">thang truoc</button>
                    <p><span className="month-display">{date?.getMonth() + 1}</span> / <span className="year-display">{date?.getFullYear()}</span></p>
                    <button className="btn doi-thang" data-thang-thaydoi="1">thang sau</button>
                </div>
                <div className="weekdates">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(i => <div key={i} className="weekdates-day">{i}</div>)}
                </div>
                <CalendarDay context={CalendarContext} />
            </div>
        </CalendarContext.Provider>
    )
}