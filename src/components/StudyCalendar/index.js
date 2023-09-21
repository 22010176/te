import React from "react";

import { ToggleClass } from "../../Utilities";

import 'reset-css'
import './styles.scss'
import { v4 } from "uuid";

export function TietHoc({ obj }) {
    if ([obj.TIETBATDAU, obj.TIETKETTHUC, obj.THU].some(i => !i)) return
    return (
        <div className="tiet-hoc" key={obj?.IDLICHHOC || obj?.DANGKY_LOPHOCPHAN_ID || v4()} data-id={obj.DANGKY_LOPHOCPHAN_ID} style={{ gridRow: [obj.TIETBATDAU, obj.TIETKETTHUC + 1].join(' / '), gridColumn: [+obj.THU - 1, +obj.THU].join(' / ') }}>
            {obj.TENHOCPHAN || obj.TENLOP || ''} <br />{obj.TENPHONGHOC || obj.PHONGHOC_TEN || ''}
        </div>
    )
}

export default function ({ data, onClick, max = 15 }) {
    function _onClick(e, obj) {
        if (!e.target.classList.contains('tiet-hoc')) return
        ToggleClass(e.target, 'tiet-hoc-active')

        if (typeof onClick == 'function') onClick(data.find(obj => obj.DANGKY_LOPHOCPHAN_ID == e.target.getAttribute('data-id')))
        // if (e.target.contains('tiet-hoc')) ToggleClass(e.target, 'tiet-hoc-active')
    }
    return (
        <div className="study-calendar">
            <div className="dates">
                {Array(7).fill().map((_, i) => <div key={i} className="table-heading date">{i != 6 ? `Thu ${i + 2}` : "Chu nhat"}</div>)}
            </div>
            <div className="tiets" style={{ gridTemplateRow: `repeat(${max}, 1fr)` }}>
                {Array(max).fill().map((_, i) => <div key={i} className="table-heading tiet">{i + 1}</div>)}
            </div>
            <div className="main-calendar" onClick={_onClick}>
                {data?.map((obj, i) => <TietHoc key={obj.IDLICHHOC || i} obj={obj} />)}
            </div>
        </div>
    )
}