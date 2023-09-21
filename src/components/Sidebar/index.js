import React from "react";

import 'reset-css'
import './styles.scss'

export default function ({ link = [] }) {
    return (
        <div className="side-bar">
            {link.map(data => (
                <div className="side-bar-link" key={data.name}>
                    <a href={data.link} className="link">{data.name}</a>
                </div>
            ))}
        </div>
    )
}