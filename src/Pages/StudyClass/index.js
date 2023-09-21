import React, { useEffect, useRef, useState } from "react";
import 'reset-css'
import './style.scss'

import { __LHCN, __DSSV } from "../../API";
import { LuuDuLieu, GetFirstAndLastDayOfWeek, LayDuLieu } from "../../Utilities";

import DateCalendar from "../../components/Calendar";
import DataField from "../../components/DataField";
import Section from "../../components/Section";
import StudyCalendar from "../../components/StudyCalendar";
import Container from "../../components/Container";
import Sidebar from "../../components/Sidebar";

export default function () {
    const [data, setData] = useState({ ...LayDuLieu("Data") })
    const [date, setDate] = useState(new Date());

    const updateCalendar = useRef(), fetchingStatus = useRef(0)

    useEffect(function () {
        if (!data.sv) document.location.replace('login')
    }, [])

    // useEffect(function () {
    //     LuuDuLieu("Data", Object.assign({}, { sv: data.sv }))
    // }, [data])

    async function SelectClass(obj) {
        // const dshs = (await __DSSV({ lhpID: obj.DANGKY_LOPHOCPHAN_ID })).rs
        // setData(cur => ({ ...cur, dshs }))
    }

    async function CalendarChange(date) {
        setDate(date)
        if (updateCalendar.current) clearTimeout(updateCalendar.current)
        if (!data.sv) return

        fetchingStatus.current = 1
        updateCalendar.current = setTimeout(async () => {
            const [ngayBD, ngayKT] = GetFirstAndLastDayOfWeek(date)
            const lh = await __LHCN({ hsID: data.sv.QLSV_NGUOIHOC_ID, ngayBD, ngayKT })

            fetchingStatus.current = 0
            setData(cur => ({ ...cur, lh }))
        }, 700)
    }

    return (
        <main className="main-app">
            <section className="top-container">
                <h1>_____</h1>
            </section>
            <section className="bottom-container">
                <Sidebar link={[{ link: '/', name: "Home" }, { link: 'create-calendar', name: "Create Calendar" }]} />
                {/* <div className="left-section">
                    <Section name="Danh sach sinh vien">
                        <Container flex direction="column" style={{ maxHeight: '600px', maxWidth: '300px' }}>
                            {data.dshs?.map?.(data => (
                                <div key={data.QLSV_NGUOIHOC_MASO} data-id={data.QLSV_NGUOIHOC_MASO} className="du-lieu">
                                    <p className="du-lieu-sect">
                                        {[data.QLSV_NGUOIHOC_HODEM, data.QLSV_NGUOIHOC_TEN].join(' ')}
                                    </p>
                                    <p className="du-lieu-sect">
                                        {data.QLSV_NGUOIHOC_MASO}
                                    </p>
                                </div>
                            ))}
                        </Container>
                    </Section>
                </div> */}
                <div className="center-section">
                    <div>
                        {fetchingStatus.current ? "Fetching..." : ""}
                    </div>
                    <StudyCalendar data={data.lh} onClick={SelectClass} />
                </div>
                <div className="left-section">
                    <Section name="Thong tin hoc sinh">
                        <DataField data={data.sv?.QLSV_NGUOIHOC_MASO} name='Ma Sinh Vien' />
                        <DataField data={[data.sv?.QLSV_NGUOIHOC_HODEM, data.sv?.QLSV_NGUOIHOC_TEN].join(' ')} name='Ten' />
                        <DataField data={data.sv?.DAOTAO_KHOAQUANLY_TEN} name='Khoa' />
                        <DataField data={data.sv?.DAOTAO_CHUONGTRINH_TEN} name='Nganh hoc' />
                    </Section>
                    <DateCalendar date={date} onChange={CalendarChange} />
                </div>
            </section >
        </main >
    )
}