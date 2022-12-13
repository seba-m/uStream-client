import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import styles from './OnlineStreamPlayer.module.scss';

import { VideoPlayer } from '../VideoPlayer';
import { FollowButton } from '../FollowButton';

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
            <div style={{ backgroundColor: stream.color }}>
                <div className={styles.streamVideo}>
                    <VideoPlayer streamUrl={stream.url} />
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
