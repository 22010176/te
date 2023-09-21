import React from "react";
import { Routes, Route } from 'react-router-dom';

import StudyClass from './Pages/StudyClass';
import CreateCalendar from './Pages/CreateCalendar';
import Index from './Pages/Index';
import Login from "./Pages/Login";

import './App.scss'

export default function () {
    return (
        <Routes>
            <Route index element={<Index />} />
            <Route path="login" element={<Login />} />
            <Route path='study-calendar' element={<StudyClass />} />
            <Route path='create-calendar' element={<CreateCalendar />} />
        </Routes>
    )
}

