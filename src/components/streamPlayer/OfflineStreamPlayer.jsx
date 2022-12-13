import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import styles from './OfflineStreamPlayer.module.scss';

import UserService from "../../services/User.service";
import AuthService from "../../services/Auth.service";

import placeholder from "../../placeholder.jpg";

import { FollowButton } from '../FollowButton';

export function OfflineStreamPlayer({ stream }) {
    const [avatar, setAvatar] = useState(placeholder);
    const [banner, setBanner] = useState(placeholder);

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        UserService.getUserAvatar(stream.username)
            .then(data => {
                if (data) {
                    setAvatar(data);
                } else {
                    setAvatar(placeholder);
                }
            })
    }, [stream.username]);

    useEffect(() => {
        UserService.getUserBanner(stream.username)
            .then(data => {
                if (data) {
                    setBanner(data);
                } else {
                    setBanner(placeholder);
                }
            })
    }, [stream.username]);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return (
        <div>
            <div style={{ backgroundColor: stream.color }}>
                <div className={styles.streamBanner}>
                    <figure className={styles.streamFrontPageImage} style={{ backgroundImage: `url(${banner})` }}></figure>
                </div>
            </div>
            <div className={styles.streamDetails}>
                <div className={styles.heroContainer}>
                    <div className={styles.streamImage}>
                        <Link to={`/stream/${stream.username}`}>
                            <figure className={styles.imageBorder} style={{ backgroundImage: `url(${avatar})`, backgroundSize: "cover" }}></figure>
                        </Link>
                        <div className={styles.aboutContainer}>
                            <div className={styles.about}>
                                <h1 >{stream.username}</h1>
                                <h4 >Followers {stream.followers}</h4>
                            </div>
                            {currentUser && currentUser?.userName?.toLowerCase() !== stream.username.toLowerCase() && (
                                <div className={styles.heroContainerRight}>
                                    <FollowButton username={stream.username} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.aboutSection}>
                    <h2 className={styles.aboutTittle}>About {stream.name}</h2>
                    <div className={styles.aboutBox}>
                        <span className={styles.textAbout}>{stream.about}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
