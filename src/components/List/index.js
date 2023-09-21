import React, { Children } from "react";
import 'reset-css'

import './styles.scss'
import { ToggleClass } from "../../Utilities";

export default function ({ name, func, data = [], children, onClick }) {
    async function _onclick(e) {
        if (typeof onClick != 'function') return
        await onClick(e);
    }
    return (
        <section className="list-data" onClick={_onclick}>
            <div className="listdata-title">
                <h1>{name || 'List'}</h1>
            </div>
            <div className="listdata-content">
                {children}
            </div>
        </section>
    )
}