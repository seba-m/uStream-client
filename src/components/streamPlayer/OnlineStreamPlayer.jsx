import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import styles from './OnlineStreamPlayer.module.scss';

import { VideoPlayer } from '../VideoPlayer';
import { FollowButton } from './FollowButton';

import UserService from "../../services/User.service";
import AuthService from "../../services/Auth.service";

export function OnlineStreamPlayer({ stream }) {

    const [avatar, setAvatar] = useState(null);

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        UserService.getUserAvatar(stream.username)
            .then(data => {
                setAvatar(data);
            })
    }, [stream.username]);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return (
        <div className={styles.streamRoot}>
            <div className={styles.streamVideo}>
                <VideoPlayer streamUrl={stream.url} />
            </div>
            <div className={styles.heroContainer}>
                <div className={styles.heroContainerLeft}>
                    <div className={styles.streamDetails}>
                        <div className={styles.streamImage}>
                            <Link to={`/stream/${stream.username}`}>
                                <figure className={styles.imageBorder}>
                                    <img src={avatar} alt={stream.title} />
                                </figure>
                            </Link>
                            <div className={styles.streamInfo}>
                                <h1 className={styles.streamUsername}>{stream.username}</h1>
                                <h3 className={styles.streamTitle}>{stream.title}</h3>
                                <div>
                                    <p className={`${styles.streamCategory}`}>{stream.category}</p>
                                    {stream.tags.length > 0 && (
                                        <div className={styles.tagsContainer}>
                                            {stream.tags.map((tag, index) =>
                                                <div className={styles.tag} key={index}>
                                                    <Link to={`/search/?term=${tag}&tag=true`} className={styles.tagUrl}>
                                                        <span>{tag}</span>
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {currentUser && currentUser?.userName !== stream.username && (
                    <div style={styles.heroContainerRight}>
                        <FollowButton stream={stream} />
                    </div>
                )}

            </div>
            <div>
                <div>
                    <h2 className={styles.streamAbout}>About {stream.username}</h2>
                    <p className={styles.streamDescriptionAbout}>{stream.about}</p>
                </div>
            </div>
        </div>
    )
}
