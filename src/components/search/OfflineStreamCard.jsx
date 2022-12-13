import { useEffect, useState } from 'react';
import styles from './OfflineStreamCard.module.scss';
import { Link } from "react-router-dom";

import UserService from "../../services/User.service";
import AuthService from "../../services/Auth.service";

import { FollowButton } from '../FollowButton';
import PlaceHolder from "../../placeholder.jpg";

export function OfflineStreamCard({ stream }) {
    const [avatar, setAvatar] = useState(PlaceHolder);

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        UserService.getUserAvatar(stream.username)
            .then(data => {
                if (data) {
                    setAvatar(data);
                } else {
                    setAvatar(PlaceHolder);
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
        <li className={styles.streamCard}>
            <div className={styles.streamImage}>
                <Link to={`/stream/${stream.username}`}>
                    <figure className={styles.imageBorder} style={{ backgroundImage: `url(${avatar})`, backgroundSize: "cover" }}></figure>
                </Link>
            </div>

            <div className={styles.streamInfo}>
                <Link to={`/stream/${stream.username}`}>
                    <h1 className={styles.streamUsername}>{stream.username}</h1>
                </Link>
                <p>{stream.followers} followers</p>
                <p className={styles.streamAbout}>{stream.about}</p>
            </div>

            {currentUser && currentUser?.userName?.toLowerCase() !== stream.username.toLowerCase() && (
                <div className={styles.followButton}>
                    <FollowButton username={stream.username} />
                </div>
            )}
        </li>
        
    )
}
