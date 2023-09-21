import React, { useEffect, useState } from "react";
import 'reset-css'

import './styles.scss'

export default function ({ max, onChange, value }) {
    // const [data, setData] = useState(value || 1)

    function _onChange(e) {
        if (typeof onChange == 'function') onChange(e.target.value)
    }

    return (
        <div className="sliders-main">
            <input onInput={_onChange} onChange={_onChange} onClick={_onChange} onMouseUp={e => console.log(e.target.value)} type="range" min="1" max={max} value={value} className="slider" id="myRange" />
        </div >
    )
}