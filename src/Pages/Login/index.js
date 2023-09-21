import React, { useEffect, useState } from "react";
import './styles.scss'

import Section from "../../components/Section";
import Form from '../../components/Form'

// import { __DN } from '../../API/Firestore/index'
import { LayDuLieu, LuuDuLieu } from "../../Utilities";
import { LayDuLieuHocSinh } from "../../API/SchoolAPI/getAPI_";

export default function () {
    const [check, setCheck] = useState(0)

    useEffect(function () {
        if (LayDuLieu("Data")?.sv) location.replace('study-calendar')
    }, [])

    async function onSubmit({ key, maSV }) {
        // console.log(key)
        const sv = (await LayDuLieuHocSinh({ hsID: key })).Data.find(i => i.QLSV_NGUOIHOC_MASO == maSV)

        LuuDuLieu('Data', { sv })
        location.replace('study-calendar')
        // console.log(LayDuLieu('Data'))
    }

    return (
        <main className="main">
            <Section name="Dang nhap" >
                {check ? <div className="error">Thong tin ko hop le</div> : undefined}
                <Form onSubmit={onSubmit} field={[{ name: "key", text: "Ma dang nhap" }, { name: "maSV", text: "Ma sinh vien" }]} />
            </Section>
        </main>
    )
}