import { StreamDetails } from './pages/StreamDetails';
import { LandingPage } from './pages/LandingPage';

import styles from './App.module.scss';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

export function App() {
    return (
        <Router>
            <header>
                <Link to="/">
                    <h1 className={styles.title}>Streaming App</h1>
                </Link>
            </header>
            <main>
                <Routes>
                    <Route exact path="/stream/:streamerId" element={<StreamDetails />}></Route>
                    <Route path="/" element={<LandingPage />}></Route>
                </Routes>
            </main>
        </Router>
    )
}
