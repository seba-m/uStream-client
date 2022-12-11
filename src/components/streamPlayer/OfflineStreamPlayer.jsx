import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import styles from './OfflineStreamPlayer.module.scss';

import UserService from "../../services/User.service";
import AuthService from "../../services/Auth.service";

import { FollowButton } from './FollowButton';

export function OfflineStreamPlayer({ stream }) {
    const [avatar, setAvatar] = useState(null);
    const [banner, setBanner] = useState(null);

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        UserService.getUserAvatar(stream.username)
            .then(data => {
                setAvatar(data);
            })
    }, [stream.username]);

    useEffect(() => {
        UserService.getUserBanner(stream.username)
            .then(data => {
                setBanner(data);
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
            <div className={styles.streamBanner}>
                <Link to={`/stream/${stream.username}`}>
                    <figure>
                        <img className={styles.streamFrontPageImage} src={banner} alt={stream.title} />
                    </figure>
                </Link>
            </div>
            <div className={styles.heroContainer}>
                <div className={styles.streamImage}>
                    <Link to={`/stream/${stream.username}`}>
                        <figure className={styles.imageBorder}>
                            <img src={avatar} alt={stream.title} />
                        </figure>
                    </Link>
                    <div className={styles.streamUsername}>
                        <h1 >{stream.username}</h1>
                        <h4 >Followers {stream.followers}</h4>
                    </div>
                </div>

                {currentUser && currentUser?.userName !== stream.username && (
                    <div style={styles.heroContainerRight}>
                        <FollowButton stream={stream} />
                    </div>
                )}

            </div>
            <div>
                <h2 className={styles.streamAbout}>About {stream.username}</h2>
                <p className={styles.streamDescriptionAbout}>{stream.about}</p>
            </div>
        </div>
    )
}
