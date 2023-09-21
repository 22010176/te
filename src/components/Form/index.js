import React, { useContext, useState } from 'react'

import 'reset-css'
import './styles.scss'

export default function ({ field = [], onSubmit }) {
    const [formData, setformData] = useState({})

    function _onSubmit(e) {
        e.preventDefault()
        if (typeof onSubmit == 'function') onSubmit(formData)
    }

    return (
        <form onSubmit={_onSubmit}>
            {field.map(data => data.name ? (
                <div className='form-section' key={data.name}>
                    <label className='text-label' htmlFor={data.name}>{data.text}</label>
                    <input className='text-input' id={data.name} name={data.name} value={formData[data.name] || ''} type={data.type || 'text'} onChange={e => setformData(cur => ({ ...cur, [data.name]: e.target.value }))} />
                </div>
            ) : undefined)}
            <div className='form-section'>
                <button className='btn submit-btn'>Submit</button>
            </div>
        </form>
    )
}