import React, { useEffect, useState } from "react";
import 'reset-css'
import './styles.scss'

import StudyCalendar from "../../components/StudyCalendar";
import Sidebar from "../../components/Sidebar";
import Slider from "../../components/Slider";
import List from "../../components/List";

import { GetDayInMonth, LayDuLieu, LuuDuLieu, ToggleClass, GetDateFromString, GetFirstAndLastDayOfWeekDate } from "../../Utilities";
import { LayHocPhanToChuc, LayLopHocPhanDangToChuc, LayTatCaKeHoachDaQua, LayLichHoc2, LayDanhSachHocPhanDaDangKi } from '../../API/SchoolAPI/getAPI_'

export default function () {
    const defaultVal = {
        khID: null, hpID: null, lhpID: null, nhomID: null, lhpthID: null,
        kh: [], hp: [], lhp: [], lhpth: [], lopDaChon: [], lichHoc: {}, lichHocHienThi: [], lddk: [],
        lichHocDaChon: [], checkDupCalendar: {}, lopHuy: []
    }
    const [data, setData] = useState(Object.assign(LayDuLieu("CreateCalendar") || defaultVal, { date: new Date() }))

    useEffect(function () {
        const Data = LayDuLieu('Data');
        if (!Object.keys(data).length) document.location.replace('login');
        (async () => await LayTatCaKeHoachDaQua({ hsID: Data.sv.QLSV_NGUOIHOC_ID }))().then(kh => setData(cur => Object.assign({}, cur, { sv: Data.sv, kh })))

    }, [])

    useEffect(function () {
        LuuDuLieu("CreateCalendar", data);
    }, [data])

    useEffect(function () {
        DisplayLH()
    }, [data.date, data.ldc])

    function onChange(date) {
        const _d = data.date
        setData(cur => Object.assign(defaultVal, cur, { date: new Date(_d.getFullYear(), _d.getMonth(), date) }))
    }
    function ChangeMonth(e) {
        const d = +e.target.getAttribute('data-val')
        const _d = data.date
        setData(cur => Object.assign(defaultVal, cur, { date: new Date(_d.getFullYear(), _d.getMonth() + d) }))
    }
    async function onClickKH(e) {
        if (!e.target.classList.contains('du-lieu')) return
        ToggleClass(e.target, 'active');

        const khID = e.target.id;

        document.querySelector('.left-section').classList.add('disable')
        const [hp, lddk] = await Promise.all([
            (await LayHocPhanToChuc({ hsID: data.sv.QLSV_NGUOIHOC_ID, ngID: data.sv.DAOTAO_TOCHUCCHUONGTRINH_ID, khID })).Data,
            (await LayDanhSachHocPhanDaDangKi({ hsID: data.sv.QLSV_NGUOIHOC_ID, khID })).Data
        ])
        document.querySelector('.left-section').classList.remove('disable')

        setData(cur => Object.assign(defaultVal, cur, { khID: e.target.id, hp, lddk, lhp: [], lhpth: [], ldc: [] }))
    }

    async function onClickHP(e) {
        if (!e.target.classList.contains('du-lieu')) return
        ToggleClass(e.target, 'active');

        const hpID = e.target.id;

        document.querySelector('.left-section').classList.add('disable')
        const lhp = (await LayLopHocPhanDangToChuc({ hsID: data.sv.QLSV_NGUOIHOC_ID, ngID: data.sv.DAOTAO_TOCHUCCHUONGTRINH_ID, khID: data.khID, hpID })).Data.rs
        document.querySelector('.left-section').classList.remove('disable')

        setData(cur => Object.assign(defaultVal, cur, { hpID, lhp: lhp.filter(i => i.THUOCTINHLOP_MA != 'TH'), lhpth: lhp.filter(i => i.THUOCTINHLOP_MA == 'TH') }))
    }

    async function onClickLHP(e) {
        if (!e.target.classList.contains('du-lieu')) return
        ToggleClass(e.target, 'active');
        setData(cur => Object.assign(defaultVal, cur, { nhomID: e.target.getAttribute('nhom'), lhpID: e.target.id, lhpthID: null }))
    }

    async function onClickLHPTH(e) {
        if (!e.target.classList.contains('du-lieu')) return
        ToggleClass(e.target, 'active');
        setData(cur => Object.assign(cur, { lhpthID: e.target.id }))
    }

    async function ThemLopBtn() {
        const lhpth = data.lhpth.find(lhp => lhp.ID == data.lhpthID)
        const lhp = data.lhp.find(lhp => lhp.ID == data.lhpID)
        const _lhpf = [lhp, lhpth].filter(i => i)
        if (!lhpth != !data.lhpth.length) return;
        if (!lhp != !data.lhp.length) return;
        if (_lhpf.every(lh => data.lddk.find(j => j.DANGKY_LOPHOCPHAN_ID == lh?.ID))) return

        if (!data.ldc) return setData(cur => Object.assign(defaultVal, cur, { ldc: [lhpth, lhp].filter(i => i) }))

        // console.log(data.lddk, _lhpf)
        const ldc = [...data.ldc?.filter(obj => !_lhpf.some(i => i.DAOTAO_HOCPHAN_ID == obj.DAOTAO_HOCPHAN_ID))];
        ldc.push(..._lhpf);

        document.querySelector('.left-section').classList.add('disable')
        const lhhp = Object.fromEntries(await Promise.all(_lhpf.map(async obj => [obj.ID, (await LayLichHoc2({ hsID: data.sv.QLSV_NGUOIHOC_ID, lhpID: obj.ID })).Data])))
        document.querySelector('.left-section').classList.remove('disable')

        setData(cur => Object.assign(defaultVal, cur, { ldc, lichHoc: Object.assign(cur.lichHoc, lhhp) }))
    }

    function LopDaChonClick(e) {
        if (!e.target.classList.contains('du-lieu')) return
        const manhomlop = e.target.getAttribute('nhom'), lhpID = e.target.id
        setData(cur => Object.assign(defaultVal, cur, { ldc: cur.ldc.filter(item => !(item.ID == lhpID || (manhomlop && item.MANHOMLOP == manhomlop))) }))
    }

    function GetLichHoc(first, last, lopDaChon) {
        if (!lopDaChon || !(first instanceof Date) || !(last instanceof Date)) return []
        const res = lopDaChon.map(i => data.lichHoc[i.ID || i.DANGKY_LOPHOCPHAN_ID]?.filter(lh => {
            const day = GetDateFromString(lh.NGAYHOC)
            return first <= day && day <= last
        }).filter(i => i).map(lh => Object.assign(lh, i))).filter(i => i).flat()

        return res;
    }
    function DisplayLH() {
        const [first, last] = GetFirstAndLastDayOfWeekDate(data.date);
        setData(cur => Object.assign(defaultVal, cur, { lichHocHienThi: [GetLichHoc(first, last, data.ldc), (GetLichHoc(first, last, data.lddk))].flat() }))
    }

    async function StudyCalendarClick(e) {
        const list = data.ldc.filter(i => i.ID == e.ID || (i.MANHOMLOP && e.MANHOMLOP == i.MANHOMLOP))
        setData(cur => Object.assign(defaultVal, cur, { ldc: data.ldc.filter(obj => !list.includes(obj)) }))
    }
    return (
        <main className="create-calendar">
            <section className="top-container">
                <h1>_____</h1>
            </section>
            <section className="bottom-container">
                <Sidebar link={[{ link: '/', name: "Home" }, { link: 'study-calendar', name: "study Calendar" }]} />
                <div className="left-section">
                    <List name={"Ke Hoach"} onClick={onClickKH}>
                        {data?.kh?.map(kh => (
                            <div key={kh.ID} id={kh.ID} className={["du-lieu", kh.ID == data.khID ? 'active' : ''].join(' ')}>
                                {kh.MAKEHOACH}
                            </div>
                        ))}
                    </List>
                    <List name={"Hoc Phan"} onClick={onClickHP}>
                        {data.hp?.map(hp => (
                            <div className={["du-lieu", hp.DADANGKY ? 'active2' : '', hp.ID == data.hpID ? 'active' : ''].join(' ')} id={hp.ID} key={hp.ID}>
                                {hp.DAOTAO_HOCPHAN_TEN}
                            </div>
                        ))}
                    </List>
                    <List name={"Lop Hoc Phan"} onClick={onClickLHP}>
                        {data.lhp?.map(lhp => (
                            <div className={["du-lieu", data.lddk.some(i => i.DANGKY_LOPHOCPHAN_ID == lhp.ID) ? 'active2' : '', lhp.ID == data.lhpID ? 'active' : ''].join(' ')} id={lhp.ID} nhom={lhp.MANHOMLOP} key={lhp.ID}>
                                {lhp.TENLOP} <br /> {lhp.GIANGVIEN}
                            </div>
                        ))}
                    </List>
                    <List name={"Lop Thuc Hanh"} onClick={onClickLHPTH}>
                        {data.lhpth?.map(lhp => (!data.lhp.length || lhp.MANHOMLOP == data.nhomID) && (
                            <div className={["du-lieu", data.lddk.some(i => i.DANGKY_LOPHOCPHAN_ID == lhp.ID) ? 'active2' : '', lhp.ID == data.lhpthID ? 'active' : ''].join(' ')} id={lhp.ID} nhom={lhp.MANHOMLOP} key={lhp.ID}>
                                {lhp.TENLOP} <br /> {lhp.GIANGVIEN}
                            </div>
                        ))}
                    </List>
                    <div className="hp-funcs" style={{ gridColumn: "1/3" }}>
                        <div className="buttons-sect">

                            <button className="btn them-lop-btn" onClick={ThemLopBtn}>+</button>
                            <button className="btn xacnhan-lop-btn" onClick={ThemLopBtn}>Xac Nhan</button>
                        </div>
                        <div className="hocphan-listting">
                            <List name={'Lop Da Chon'} onClick={LopDaChonClick}>
                                {data.ldc?.map(lhp => (
                                    <div className="du-lieu lhpdc" id={lhp.ID} nhom={lhp.MANHOMLOP} key={lhp.ID}>
                                        {lhp.TENLOP} <br /> {lhp.GIANGVIEN}
                                    </div>
                                ))}
                            </List>
                            <List name={'Lop Da Dang Ki'} >
                                {data.lddk?.map(lhp => (
                                    <div className="du-lieu lhpdc" id={lhp.ID} nhom={lhp.MANHOMLOP} key={lhp.ID}>
                                        {lhp.DANGKY_LOPHOCPHAN_TEN} <br /> {lhp.GIANGVIEN}
                                    </div>
                                ))}
                            </List>
                        </div>
                    </div>
                </div>
                <div className="right-section">
                    <div className="slider-calendar-component">
                        <div className="slider-calendar">
                            <div className="change-month-button" >
                                <button className="left" data-val="-1" onClick={ChangeMonth}></button>
                            </div>
                            <div className="slider-calendar-data">
                                <span data-day>{data.date.getDate()}</span>
                                <p>/</p>
                                <span data-month>{data.date.getMonth() + 1}</span>
                                <p>/</p>
                                <span data-year>{data.date.getFullYear()}</span>
                            </div>
                            <div className="change-month-button" >
                                <button className="right" data-val="1" onClick={ChangeMonth}></button>
                            </div>
                        </div>
                        <Slider value={data.date.getDate()} max={GetDayInMonth(data.date.getMonth() + 1, data.date.getFullYear())} onChange={onChange} />
                    </div>
                    <StudyCalendar max={15} data={data.lichHocHienThi} onClick={StudyCalendarClick} />
                </div>
            </section >
        </main >
    )
}
