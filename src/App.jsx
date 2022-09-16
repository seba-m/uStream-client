import React from 'react'
import { StreamDetails } from './pages/StreamDetails';
import { LandingPage } from './pages/LandingPage';
import { useState, useEffect } from 'react';

import styles from './App.module.scss';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

export function App() {
    /* const [api, setApi] = useState("");

    fetch("http://localhost:9000/live/1234")
        .then(res => res)
        .then(res => setApi(res))
        .then(res => console.log(res))
        .catch(err => err);*/

    return (
        <Router>
            <header>
                <Link to="/">
                    <h1 className={styles.title}>Streaming xd</h1>
                </Link>
            </header>
            <main>
                <Routes>
                    <Route exact path="/streamer/:streamerId" element={<StreamDetails />}></Route>
                    <Route path="/" element={<LandingPage />}></Route>
                </Routes>
            </main>
        </Router>
    )
}