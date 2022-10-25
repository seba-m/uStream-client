import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { StreamDetails } from './pages/StreamDetails';
import { SearchPage } from './pages/SearchPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { SearchTag } from './pages/SearchTag';
import { SearchStream } from './pages/SearchStream';
import { SearchCategory } from './pages/SearchCategory';

import styles from './App.module.scss';
import { Search } from './components/Search';

import AuthService from "./services/Auth.service";
import LandingPage from './pages/LandingPage';

export function App() {

    const [currentUser, setCurrentUser] = useState(false);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }

    }, []);

    const logOut = () => {
        AuthService.logout();
        setCurrentUser(undefined);
    };

    return (
        <Router>
            <header>
                <nav className={styles.container}>
                    <div className={styles.left}>
                        <Link to="/">
                            <h1 className={styles.title}>Streaming App</h1>
                        </Link>
                    </div>

                    <div className={styles.center}>
                        <Search />
                    </div>

                    {currentUser ?
                        (
                            <div className={styles.right}>
                                <Link to="/profile">
                                    <h1 className={styles.profile}>{currentUser.userName}</h1>
                                </Link>
                                <Link to="/" onClick={logOut}>
                                    <h1 className={styles.signup}>Logout</h1>
                                </Link>
                            </div>
                        ) : (
                            <div className={styles.right}>
                                <Link to="/login">
                                    <h1 className={styles.login}>Login</h1>
                                </Link>
                                <Link to="/signup">
                                    <h1 className={styles.signup}>Signup</h1>
                                </Link>
                            </div>
                        )
                    }
                </nav>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route exact path="/login" element={<Login />}></Route>
                    <Route exact path="/signup" element={<Register />}></Route>
                    <Route exact path="/profile" element={<Profile />}></Route>
                    <Route exact path="/search" element={<SearchPage />}></Route>
                    <Route exact path="/search/tag" element={<SearchTag />}></Route>
                    <Route exact path="/search/category" element={<SearchCategory />}></Route>
                    <Route exact path="/search/stream" element={<SearchStream />}></Route>
                    <Route exact path="/stream/:streamerName" element={<StreamDetails />}></Route>
                </Routes>
            </main>
        </Router>
    )
}
