import React from "react";

import 'reset-css'
import './styles.scss'

export default function ({ name, data }) {
    return (
        <div className="info-list">
            <h3 className="info-list-heading">{name}</h3>
            <p className="info-list-content" data-field={name.toLowerCase().replaceAll('-')}>{data}</p>
        </div>
    )
}
