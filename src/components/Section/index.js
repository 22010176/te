import React from "react";

import 'reset-css'
import './styles.scss'

export default function Section({ name, children }) {
    return (
        <section className="section">
            <div className="section-title">
                <h2>{name}</h2>
            </div>
            <div className="section-content" >
                {children}
            </div>
        </section>
    )
}
