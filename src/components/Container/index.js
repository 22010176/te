import React from "react";

import 'reset-css'
import './styles.scss'

export default function ({ children, flex, direction = "row", style }) {
    return (
        <div className="container">
            <div style={{ flexDirection: direction, ...style }} className={[flex ? "danh-sach-flex" : "danh-sach"].filter(i => i).join(' ')}>
                {children}
            </div>
        </div >
    )
}