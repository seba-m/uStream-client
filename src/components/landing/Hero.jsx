import React, { useState, useEffect } from 'react'

import styles from './Hero.module.scss'
import { Credentials } from "../../pages/Credentials";
import AuthService from "../../services/Auth.service";


export function Hero() {
    const [modalShow, setModalShow] = useState(false);
    const [currentUser, setCurrentUser] = useState(false);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return (
        <div className={styles.heroContainer}>
            <div className={styles.heroContentLeft}>
                <h2 className={styles.slogan}>
                    Enjoy the
                    <br/>
                    experience
                </h2>
                {currentUser?   
                <div>
                    <h3 style={{ marginBottom:0 }}>Share your favorite things with others!</h3>
                </div> :
                <div>
                    <h3>Share your favorite things with others!</h3>
                    <button onClick={() => {
                                    setModalShow(true);
                                }} >Get started</button>
                </div>}
                
            </div>
            <div className={styles.heroContentRight}>
                <div className={styles.logoBox}>
                    <svg
                        className={styles.logo}
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
                    
                    <div className={styles.decoration}>
                        <div className={styles.top}></div>
                        <div className={styles.bottom}></div>
                        <img className={styles.img1} src="https://i.imgur.com/XDd7ETN.jpeg" alt="" />
                        <img className={styles.img2} src="https://i.imgur.com/GNDLT01.jpeg" alt="" />
                        <img className={styles.img3} src="https://i.imgur.com/3KBKfgn.jpeg" alt="" />
                        <img className={styles.img4} src="https://i.imgur.com/YXciMAe.jpeg" alt="" />
                        {/*<div className={`${styles.decoration} ${styles.left}`}></div>*/}
                    </div>
                </div>
            </div>
            <Credentials show={modalShow} onHide={() => setModalShow(false)} />

        </div>
    )
}
