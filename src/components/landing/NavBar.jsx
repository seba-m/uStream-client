import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";

import styles from './NavBar.module.scss'
import { Search } from "../Search";

import PlaceHolder from "../../placeholder.jpg";
import UserService from "../../services/User.service";
import AuthService from "../../services/Auth.service";

import { Credentials } from "../../pages/Credentials";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faGear,
    faRightFromBracket,
    faRightToBracket
} from "@fortawesome/free-solid-svg-icons";

export function NavBar() {
    const [currentUser, setCurrentUser] = useState(false);

    const [modalShow, setModalShow] = useState(false);

    const [avatar, setAvatar] = useState(PlaceHolder);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }
    }, []);

    useEffect(() => {
        if (currentUser?.userName) {
            UserService.getUserAvatar(currentUser?.userName).then((data) => {
                if (data) {
                    setAvatar(data);
                } else {
                    setAvatar(PlaceHolder);
                }
            });
        }
    }, [currentUser?.userName]);

    const logOut = () => {
        AuthService.logout();
        setCurrentUser(undefined);
        window.location.href = "/";
    };

    return (
        <>
            <nav className={styles.navContainer}>
                <div className={styles.left}>
                    <Link to="/">
                        <div className={styles.logoBox}>
                            <div className={styles.logo}>
                                <svg
                                    width="28"
                                    height="100%"
                                    viewBox="0 0 28 28"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_2_80)">
                                        <path
                                            d="M0.575317 28H10.0685C14.57 28 18.2192 24.3508 18.2192 19.8493H8.726C4.2245 19.8493 0.575317 23.4985 0.575317 28Z"
                                            fill="#2EC5CE"
                                        />
                                        <path
                                            d="M0.575317 8.63012V20.6164C5.07682 20.6164 8.726 16.9672 8.726 12.4657V0.479431C4.2245 0.479431 0.575317 4.12862 0.575317 8.63012Z"
                                            fill="#2EC5CE"
                                        />
                                        <path
                                            d="M27.4247 0H17.9315C13.43 0 9.78082 3.64919 9.78082 8.15068H19.274C23.7755 8.15068 27.4247 4.5015 27.4247 0Z"
                                            fill="#2EC5CE"
                                        />
                                        <path
                                            d="M27.4247 19.3698V7.38354C22.9232 7.38354 19.274 11.0327 19.274 15.5342V27.5205C23.7755 27.5205 27.4247 23.8713 27.4247 19.3698Z"
                                            fill="#2EC5CE"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2_80">
                                            <rect width="28" height="28" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <h1 className={`${styles.textNav} ${styles.uStream}`}>uStream</h1>
                        </div>
                    </Link>
                    <div>
                        <Link to="/search">
                            <h2 className={styles.textNav}>Categories</h2>
                        </Link>

                    </div>
                    {currentUser && (
                        <Link to="/following">
                            <h2 className={styles.textNav}>Following</h2>
                        </Link>
                    )}
                </div>
                <Search />
                <div className={styles.right}>
                    {currentUser ? (
                        <>
                            <Link to={`/stream/${currentUser.userName}`}>
                                <div className={styles.profileBox}>
                                    <img
                                        className={styles.profilePhoto}
                                        src={avatar}
                                        alt="user-img"
                                    />
                                    <h2 className={`${styles.textNav} ${styles.userName}`}>{currentUser.userName}</h2>
                                </div>
                            </Link>
                            <Dropdown as={ButtonGroup}>
                                <Dropdown.Toggle
                                    id="dropdown-basic"
                                    className={styles.dropdownButon}
                                >
                                    <FontAwesomeIcon
                                        icon={faBars}
                                        className={styles.dropdownIcon}
                                    />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className={styles.dropdownOptions}>
                                    <Link className={styles.dropdownLink} to="/profile">
                                        <div className={styles.dropdownItem}>
                                            <FontAwesomeIcon
                                                icon={faGear}
                                                className={styles.dropdownOptionIcon}
                                            />
                                            <span>Configuration</span>
                                        </div>
                                    </Link>
                                    <Dropdown.Divider className={styles.dividerLine} />
                                    <Link className={styles.dropdownLink} to="/" onClick={logOut}>
                                        <div className={styles.dropdownItem}>
                                            <FontAwesomeIcon
                                                icon={faRightFromBracket}
                                                className={styles.dropdownOptionIcon}
                                            />
                                            <span>Logout</span>
                                        </div>
                                    </Link>
                                </Dropdown.Menu>
                            </Dropdown>
                        </>
                    ) : (
                        <>
                            <button
                                className={styles.signupBox}
                                onClick={() => {
                                    setModalShow(true);
                                }}
                            >
                                <h2 className={styles.buttonText}>
                                    <span className={styles.loginText}>Login / Sign up</span>
                                    <FontAwesomeIcon className={styles.loginIcon} icon={faRightToBracket} />
                                </h2>
                            </button>
                        </>
                    )}
                </div>
            </nav>
            <Credentials show={modalShow} onHide={() => setModalShow(false)} />
        </>
    )
}
